
// Router adapter - abstracts routing library specifics
import { useNavigate as useReactRouterNavigate, useLocation as useReactRouterLocation, Link as ReactRouterLink } from "react-router-dom";
import type { ComponentProps } from "react";

// Standardized navigation interface
export interface NavigationOptions {
  replace?: boolean;
  state?: any;
}

export function useNavigate() {
  const navigate = useReactRouterNavigate();
  
  return (to: string, options?: NavigationOptions) => {
    navigate(to, {
      replace: options?.replace,
      state: options?.state,
    });
  };
}

export function useLocation() {
  const location = useReactRouterLocation();
  return {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state,
  };
}

// Wrapped Link component
export const Link = (props: ComponentProps<typeof ReactRouterLink>) => (
  <ReactRouterLink {...props} />
);

export type LinkProps = ComponentProps<typeof Link>;
