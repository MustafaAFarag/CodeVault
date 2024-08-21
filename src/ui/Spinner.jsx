import { Skeleton } from 'primereact/skeleton';

const Spinner = () => (
  <div style={{ margin: '4.8rem auto', width: '6.4rem' }}>
    <Skeleton shape="circle" size="64px" />
    <Skeleton
      shape="rectangle"
      width="64px"
      height="64px"
      style={{ marginTop: '1rem' }}
    />
  </div>
);

export default Spinner;
