export const countries = async () => {
  try {
    const res = await fetch(`api/locations/countries`, {
      cache: "no-cache",
      method: "GET",
    });

    const countries = await res.json();

    return countries;
  } catch (error: any) {
    console.log(error);
  }
};

export const states = async (countryId: number | string) => {
  try {
    const res = await fetch(`api/locations/states/?countryId=${countryId}`, {
      cache: "no-cache",
      method: "GET",
    });

    const states = await res.json();
    return states;
  } catch (error: any) {
    console.log(error);
  }
};

export const cities = async (stateId: number | string) => {
  try {
    const res = await fetch(`/api/cities?stateId=${stateId}`, {
      cache: "no-cache",
      method: "GET",
    });

    const cities = await res.json();
    return cities;
  } catch (error) {
    console.log(error);
  }
};
