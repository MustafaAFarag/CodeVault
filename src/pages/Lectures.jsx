import { fetchLecturesAndSheets } from '../services/apiSheets';
import SheetsPage from '../ui/SheetsPage';

function Lectures() {
  return (
    <SheetsPage
      title="Lectures"
      queryKey="lecturesAndSheets"
      queryFn={fetchLecturesAndSheets}
    />
  );
}

export default Lectures;
