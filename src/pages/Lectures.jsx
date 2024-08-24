import {
  fetchLecturesAndSheets,
  uploadLectureSheet,
} from '../services/apiSheets';
import SheetsPage from '../ui/SheetsPage';

function Lectures() {
  return (
    <SheetsPage
      title="Lectures"
      queryKey="lecturesAndSheets"
      queryFn={fetchLecturesAndSheets}
      uploadFn={uploadLectureSheet}
    />
  );
}

export default Lectures;
