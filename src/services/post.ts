import { baseAuthQuery, baseUrl } from '@/services/base-query';
import { IParams, PostState } from '@/types/post';

const revalidate = 60;
export async function getPostList(params: IParams) {
  try {
    const defaultParams = {
      ...params,
      state: PostState.POST_STATE_PUBLIC,
    };

    const queryParams = new URLSearchParams();
    Object.keys(defaultParams).forEach((key) => {
      const paramValue = defaultParams[key];
      if (paramValue !== undefined && paramValue !== null) {
        queryParams.append(key, String(paramValue));
      }
    });

    const res = await fetch(`${baseUrl}/portal/news?${queryParams}`, {
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

export async function getFeatureNewsList(params: IParams) {
  try {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      const paramValue = params[key];
      if (paramValue !== undefined && paramValue !== null) {
        queryParams.append(key, String(paramValue));
      }
    });

    const res = await fetch(`${baseUrl}/portal/feature-news?${queryParams}`, {
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

export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/portal/single-news?slug=${slug}`, {
      ...baseAuthQuery(),
      next: { revalidate },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    return null;
  }
}
