import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  const [query, setQuery] = useSearchParams();
  const lat = query.get('lat');
  const lng = query.get('lng');
  
  return [lat, lng]
}