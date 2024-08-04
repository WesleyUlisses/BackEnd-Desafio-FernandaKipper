import { prisma } from "../../prisma.databases";

class CityDals {
  async doesCityExist(name: string, state: string) {
    const city = await prisma.city.findFirst({
      where: {
        name: name,
        state: state,
      },
    });
    return city;
  }
  async findCityByCoordinates(latitude: string, longitude: string) {
   
    const city = await prisma.city.findFirst({
      where: { latitude: `${latitude}`, longitude: `${longitude}` },
    });
    

    return city;
  }
}

export { CityDals };
