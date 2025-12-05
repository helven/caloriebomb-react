interface Props {
  title?: string,
  description?: string,
  className?: string,
  banner?: string,
};

const PageHeading = ({ title = '', description = '', className = '', banner = '' }: Props) => {
  return (
    <section className={`${className}`}>
      <h1 className="mb-4 text-3xl font-bold dark:text-white">{title}</h1>
      {description && <p className="text-gray-600">{description}</p>}
      {banner && <img src={banner} alt={title} className="my-8" />}
    </section>
  );
};

export default PageHeading;
