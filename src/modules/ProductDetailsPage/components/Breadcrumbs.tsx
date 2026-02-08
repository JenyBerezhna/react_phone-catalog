import { Link } from 'react-router-dom';

export const Breadcrumbs = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => {
  const categoryPath = `/${category}`;

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      <span>/</span>
      <Link to={categoryPath}>
        {category[0].toUpperCase() + category.slice(1)}
      </Link>
      <span>/</span>
      <span>{name}</span>
    </nav>
  );
};
