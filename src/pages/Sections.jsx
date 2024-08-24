import {
  fetchSectionsAndSheets,
  uploadSectionSheet,
} from '../services/apiSheets';
import SheetsPage from '../ui/SheetsPage';

function Sections() {
  return (
    <SheetsPage
      title="Sections"
      queryKey="sectionsAndSheets"
      queryFn={fetchSectionsAndSheets}
      uploadFn={uploadSectionSheet}
    />
  );
}

export default Sections;
