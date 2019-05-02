export const navigate = (navigator, route, options) =>
  navigator.navigate(route, {
    prevRoute: navigator.state.routeName,
    ...options
  });
