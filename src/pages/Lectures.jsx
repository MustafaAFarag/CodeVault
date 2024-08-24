import {
  fetchLecturesAndSheets,
  uploadLectureSheet,
  deleteLectureSheet,
} from '../services/apiSheets';
import SheetsPage from '../features/Sheets/SheetsPage';

function Lectures() {
  return (
    <SheetsPage
      title="Lectures"
      queryKey="lecturesAndSheets"
      queryFn={fetchLecturesAndSheets}
      uploadFn={uploadLectureSheet}
      deleteFn={deleteLectureSheet}
    />
  );
}

export default Lectures;
