// * IP 주소 확인
export const getIpAddress = (request: Request) => {
  return (
    request.headers['x-real-ip'] ||
    request.headers['x-forwarded-for'] ||
    '0.0.0.0'
  );
};

// * Key-Value Pair 문자열로 변환
export const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value;
  return `${key}=${encodeURIComponent(valueString)}`;
};

// * Query string으로 변환
export const formatQueryString = (params: Record<string, any>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value !== 'undefined') searchParams.append(key, String(value));
  });
  return '?' + searchParams.toString();
};

// * JSON fetch
export const fetchJson = async <T = any>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw error;
  }
};

// * x-www-form-urlencoded fetch
export const fetchForm = async <T = any>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options?.headers,
      },
    });
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw error;
  }
};
