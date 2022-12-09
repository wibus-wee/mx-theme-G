export const isDev = () => process.env.NODE_ENV === 'development';
export const isClientSide = () => typeof window !== 'undefined';
export const isServerSide = () => typeof window === 'undefined';