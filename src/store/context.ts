import { createContext } from 'react';

/**
 * Authentication Context
 */
export type AuthContextType = {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});

/**
 * Country context
 */
export type Country = 'us' | 'fr';

export type CountryContextType = {
	country: Country;
	setCountry: React.Dispatch<React.SetStateAction<Country>>;
};

export const CountryContext = createContext<CountryContextType>({
	country: 'us',
	setCountry: () => {},
});
