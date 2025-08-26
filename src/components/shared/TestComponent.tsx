import { formatPrice } from '../../helpers';
import { useUser } from '../../hooks';

export const TestComponent = () => {
  const { session, isLoading } = useUser();
  
  const testPrice = 1234.56;
  
  return (
    <div className="p-4 border border-gray-300 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">Componente de Prueba</h3>
      
      <div className="space-y-2">
        <p><strong>Precio de prueba:</strong> {formatPrice(testPrice)}</p>
        <p><strong>Usuario logueado:</strong> {isLoading ? 'Cargando...' : session?.user?.email || 'No logueado'}</p>
        <p><strong>Session completa:</strong> {JSON.stringify(session, null, 2)}</p>
      </div>
    </div>
  );
};