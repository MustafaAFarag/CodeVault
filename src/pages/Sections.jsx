import {
  fetchSectionsAndSheets,
  uploadSectionSheet,
  deleteSectionSheet,
} from '../services/apiSheets';
import SheetsPage from '../features/Sheets/SheetsPage';

function Sections() {
  return (
    <SheetsPage
      title="Sections"
      queryKey="sectionsAndSheets"
      queryFn={fetchSectionsAndSheets}
      uploadFn={uploadSectionSheet}
      deleteFn={deleteSectionSheet}
    />
  );
}

export default Sections;
