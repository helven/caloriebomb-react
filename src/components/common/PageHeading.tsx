const PageHeading = ({
  title = '',
  description = ''
}) =>{
  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold dark:text-white">{title}</h1>
      {description && (
        <p className=" text-gray-600">{description}</p>
      )}
    </section>
  );
}

export default PageHeading;