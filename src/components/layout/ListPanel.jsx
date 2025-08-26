import Sidebar from './Sidebar';

function ListPanel() {
  return (
    <div className="h-full flex flex-col">
      <Sidebar.ActiveTabContent />
    </div>
  );
}

export default ListPanel;
