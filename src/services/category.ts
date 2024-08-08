import { baseAuthQuery, baseUrl } from '@/services/base-query';
import { EState, ResCountry } from '@/types/common';

const revalidate = 60;
export async function getCategoryList(params: any) {
  try {
    const defaultParams = {
      ...params,
      state: EState.STATE_PUBLIC,
    };

    const queryParams = new URLSearchParams();
    Object.keys(defaultParams).forEach((key) => {
      const paramValue = defaultParams[key];
      if (paramValue !== undefined && paramValue !== null) {
        queryParams.append(key, String(paramValue));
      }
    });

    const res = await fetch(`${baseUrl}/portal/categories?${queryParams}`, {
      ...baseAuthQuery(),
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    return null;
    // throw new Error('Failed to fetch data');
  }
}

export async function getCategoryById(params: any) {
  const defaultParams = {
    ...params,
  };

  const queryParams = new URLSearchParams();
  Object.keys(defaultParams).forEach((key) => {
    const paramValue = defaultParams[key];
    if (paramValue !== undefined && paramValue !== null) {
      queryParams.append(key, String(paramValue));
    }
  });

  try {
    const res = await fetch(`${baseUrl}/portal/categories?${queryParams}`, {
      ...baseAuthQuery(),
      next: { revalidate },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

export async function getCountriesList(): Promise<ResCountry> {
  try {
    const params = new URLSearchParams({
      'pageable.paging_ignored': 'true',
      'pageable.sort': 'name,asc',
    });

    const res = await fetch(`${baseUrl}/countries?${params.toString()}`, {
      next: { revalidate: 60 },
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
