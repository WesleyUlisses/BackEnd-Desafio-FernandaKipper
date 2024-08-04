export interface IAdressCreate{
    cityName: string,
    state: string,
    cep: string,
    userId: number,
    neighborhood: string,
    location: ILocation
    street: string
}

// Interface para coordenadas (latitude e longitude)
interface ICoordinates {
  longitude: string;
  latitude: string;
}

// Interface para localização, que inclui o tipo e as coordenadas
// Interface para coordenadas (latitude e longitude)
interface ICoordinates {
  longitude: string;
  latitude: string;
}

// Interface para localização, que inclui o tipo e as coordenadas
interface ILocation {
  type: string;
  coordinates: ICoordinates;
}

// Interface para o endereço, que inclui todos os campos relacionados ao endereço, localização e serviço
interface IAddress {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  location: ILocation;
}

// Exportação das interfaces
export { IAddress, ICoordinates, ILocation };
