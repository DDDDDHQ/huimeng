import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Record } from '@/pages/Record';
import { DreamDetail } from '@/pages/DreamDetail';
import { EditDream } from '@/pages/EditDream';
import { Profile } from '@/pages/Profile';
import { Records } from '@/pages/Records';
import { ApiSettings } from '@/pages/ApiSettings';
import { StyleSettings } from '@/pages/StyleSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="record" element={<Record />} />
          <Route path="record/edit/:id" element={<EditDream />} />
          <Route path="dream/:id" element={<DreamDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="records" element={<Records />} />
          <Route path="settings/api" element={<ApiSettings />} />
          <Route path="settings/style" element={<StyleSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
