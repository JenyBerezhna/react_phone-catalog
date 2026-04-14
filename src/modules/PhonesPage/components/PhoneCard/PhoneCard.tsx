import { Breadcrumbs } from '../../../../components/Breadcrumbs/Breadcrumbs';

export const PhonesPage = () => {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Phones' }]} />

      <h1 className="page-title">Mobile phones</h1>
      {/* rest of the page */}
    </>
  );
};
