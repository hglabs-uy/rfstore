import { OrderInput } from '../interfaces';
import { supabase } from '../supabase/client';

export const createOrder = async (order: OrderInput) => {
	// 1. Obtener el usuario autenticado + Cliente de tabla customer
	const { data, error: errorUser } = await supabase.auth.getUser();

	if (errorUser) {
		console.log(errorUser);
		throw new Error('No se pudo obtener el usuario');
	}

	if (!data.user) {
		throw new Error('Usuario no autenticado');
	}

	const userId = data.user.id;

	const { data: customer, error: errorCustomer } = await supabase
		.from('customers')
		.select('id')
		.eq('user_id', userId)
		.single();

	if (errorCustomer) {
		console.log(errorCustomer);
		throw new Error('No se pudo obtener el cliente');
	}

	// 2. Verificar que haya stock suficiente para cada variante en el carrito
	for (const item of order.cartItems) {
		const { data: variantData, error: variantError } = await supabase
			.from('variants')
			.select('stock')
			.eq('id', item.variantId)
			.single();

		if (variantError) {
			console.log(variantError);
			throw new Error('No se pudo obtener la variante');
		}

		if (!variantData) throw new Error('Variante no encontrada');

		if (variantData.stock < item.quantity)
			throw new Error('Stock insuficiente');
	}

	// 3. Guardar la dirección del envío
	const { data: addressData, error: addressError } = await supabase
		.from('addresses')
		.insert({
			address_line1: order.address.addressLine1,
			address_line2: order.address.addressLine2,
			city: order.address.city,
			state: order.address.state,
			postal_code: order.address.postalCode,
			country: order.address.country,
			customer_id: customer.id,
		})
		.select()
		.single();

	if (addressError) throw new Error(addressError.message);

	// 4. Crear la orden
	const { data: orderData, error: orderError } = await supabase
		.from('orders')
		.insert({
			customer_id: customer.id,
			address_id: addressData.id,
			total_amount: order.totalAmount,
			status: 'Cotización',
		})
		.select()
		.single();

	if (orderError) throw new Error(orderError.message);

	// 5. Crear los order items
	const orderItems = order.cartItems.map(item => ({
		order_id: orderData.id,
		variant_id: item.variantId,
		price: item.price,
		quantity: item.quantity,
	}));

	const { error: orderItemsError } = await supabase
		.from('order_items')
		.insert(orderItems);

	if (orderItemsError) throw new Error(orderItemsError.message);

	// 6. Reducir el stock de cada variante
	for (const item of order.cartItems) {
		// Obtener el stock actual
		const { data: variantData } = await supabase
			.from('variants')
			.select('stock')
			.eq('id', item.variantId)
			.single();

		if (!variantData) continue;

		const newStock = variantData.stock - item.quantity;

		const { error: updatedStockError } = await supabase
			.from('variants')
			.update({
				stock: newStock,
			})
			.eq('id', item.variantId);

		if (updatedStockError) {
			console.log(updatedStockError);
			throw new Error(`No se pudo actualizar el stock de la variante`);
		}
	}

	return orderData;
};

export const getOrdersByCustomerId = async () => {
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		console.log(error);
		throw new Error('No se pudo obtener el usuario');
	}

	if (!data.user) {
		throw new Error('Usuario no autenticado');
	}

	const userId = data.user.id;

	const { data: customer, error: customerError } = await supabase
		.from('customers')
		.select('id')
		.eq('user_id', userId)
		.single();

	if (customerError) {
		console.log(customerError);
		throw new Error('No se pudo obtener el cliente');
	}

	const customerId = customer.id;

	const { data: orders, error: ordersError } = await supabase
		.from('orders')
		.select('id, total_amount, status, created_at')
		.eq('customer_id', customerId)
		.order('created_at', { ascending: false });

	if (ordersError) throw new Error(ordersError.message);

	return orders;
};

export const getOrderById = async (orderId: number) => {
	const { data, error: errorUser } = await supabase.auth.getUser();

	if (errorUser) {
		console.log(errorUser);
		throw new Error('No se pudo obtener la sesión');
	}

	if (!data.user) {
		throw new Error('Usuario no autenticado');
	}

	const { data: customer, error: customerError } = await supabase
		.from('customers')
		.select('id')
		.eq('user_id', data.user.id)
		.single();

	if (customerError) {
		console.log(customerError);
		throw new Error('No se pudo obtener el cliente');
	}

	const customerId = customer.id;

	const { data: order, error } = await supabase
		.from('orders')
		.select(
			`
				id, total_amount, status, created_at,
				addresses:addresses(*),
				order_items:order_items(quantity, price, variants(color_name, storage, products(name, images)))
			`
		)
		.eq('id', orderId)
		.eq('customer_id', customerId)
		.single();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return {
		id: order.id,
		orderItems: order.order_items.map(item => ({
			productImage: item.variants?.products?.images?.[0] || '',
			productName: item.variants?.products?.name || '',
			price: item.price,
			quantity: item.quantity,
			color_name: item.variants ? item.variants.color_name : '',
			storage: item.variants ? item.variants.storage : '',
		})),
		totalAmount: order.total_amount,
		status: order.status,
		created_at: order.created_at,
		address: {
			addressLine1: order.addresses.address_line1,
			addressLine2: order.addresses.address_line2,
			city: order.addresses.city,
			state: order.addresses.state,
			postalCode: order.addresses.postal_code,
			country: order.addresses.country,
		},
		customer: {
			full_name: data.user.user_metadata.full_name,
			email: data.user.email || '',
		},
	};
};

/* ********************************** */
/*            ADMINISTRADOR           */
/* ********************************** */
export const getAllOrders = async () => {
	const { data, error } = await supabase
		.from('orders')
		.select('id, total_amount, status, created_at, customers(full_name, email)')
		.order('created_at', { ascending: false });

	if (error) throw new Error(error.message);

	return data;
};

export const updateOrderStatus = async ({
	id,
	status,
}: {
	id: number;
	status: string;
}) => {
	const { error } = await supabase
		.from('orders')
		.update({ status })
		.eq('id', id);

	if (error) throw new Error(error.message);
};

export const getOrderByIdAdmin = async (id: number) => {
	const { data: order, error } = await supabase
		.from('orders')
		.select(
			`
				id, total_amount, status, created_at,
				addresses:addresses(*),
				order_items:order_items(quantity, price, variants(color_name, storage, products(name, images))),
				customers:customers(full_name, email)
			`
		)
		.eq('id', id)
		.single();

	if (error) throw new Error(error.message);

	return {
		id: order.id,
		orderItems: order.order_items.map(item => ({
			productImage: item.variants?.products?.images?.[0] || '',
			productName: item.variants?.products?.name || '',
			price: item.price,
			quantity: item.quantity,
			color_name: item.variants ? item.variants.color_name : '',
			storage: item.variants ? item.variants.storage : '',
		})),
		totalAmount: order.total_amount,
		status: order.status,
		created_at: order.created_at,
		address: {
			addressLine1: order.addresses.address_line1,
			addressLine2: order.addresses.address_line2,
			city: order.addresses.city,
			state: order.addresses.state,
			postalCode: order.addresses.postal_code,
			country: order.addresses.country,
		},
		customer: {
			full_name: order.customers?.full_name || '',
			email: order.customers?.email || '',
		},
	};
};
