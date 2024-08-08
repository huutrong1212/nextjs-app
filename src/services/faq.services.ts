import { baseAuthQuery, baseUrl } from './base-query';

const revalidate = 60;
export async function getFaqsList(params: any = {}): Promise<any> {
  try {
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

    const res = await fetch(`${baseUrl}/portal/faqs?${queryParams}`, {
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
