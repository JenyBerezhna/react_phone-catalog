import { useLocation } from 'react-router-dom';

export const useBreadcrumbs = () => {
  const location = useLocation();

  const parts = location.pathname.split('/').filter(Boolean);

  const format = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');

  const items = parts.map((part, index) => {
    const to = '/' + parts.slice(0, index + 1).join('/');

    return {
      label: format(part),
      to: index === parts.length - 1 ? undefined : to,
    };
  });

  return items;
};
