import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Crud, DataSourceCache } from '@toolpad/core/Crud';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import axios from 'axios';

const NAVIGATION = [
  {
    segment: 'artifacts',
    title: 'Artifacts',
    icon: <Inventory2Icon />,
    pattern: 'artifacts{/:artifactId}*',
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const artifactsDataSource = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'subDescription', headerName: 'Sub Description', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'information', headerName: 'Information', flex: 1 },
    { field: 'avis', headerName: 'Avis', flex: 1 },
    { field: 'design', headerName: 'Design', flex: 1 },
    { field: 'banner', headerName: 'Banner', flex: 1 },
    { field: 'pictures', headerName: 'Pictures', flex: 1, renderCell: (params) => params.value?.join(', ') },
  ],
  getMany: async ({ paginationModel }) => {
    const page = paginationModel.page + 1;
    const pageSize = paginationModel.pageSize;
    const res = await axios.get(`http://localhost:3000/api/artifacts/getall`);
    // Add 'id' property for DataGrid
    const mapped = res.data.map((artifact) => ({ ...artifact, id: artifact._id }));
    const items = mapped.slice((page - 1) * pageSize, page * pageSize);
    return {
      items,
      itemCount: mapped.length,
    };
  },
  getOne: async (artifactId) => {
    const res = await axios.get(`http://localhost:3000/api/artifacts/get/${artifactId}`);
    return { ...res.data, id: res.data._id };
  },
  createOne: async (data) => {
    const res = await axios.post(`http://localhost:3000/api/artifacts/create`, data);
    return res.data;
  },
  updateOne: async (artifactId, data) => {
    const res = await axios.put(`http://localhost:3000/api/artifacts/update/${artifactId}`, data);
    return res.data;
  },
  deleteOne: async (artifactId) => {
    await axios.delete(`http://localhost:3000/api/artifacts/delete/${artifactId}`);
  },
  validate: (formValues) => {
    let issues = [];
    if (!formValues.title) {
      issues.push({ message: 'Title is required', path: ['title'] });
    }
    if (!formValues.subDescription) {
      issues.push({ message: 'Sub Description is required', path: ['subDescription'] });
    }
    if (!formValues.description) {
      issues.push({ message: 'Description is required', path: ['description'] });
    }
    if (!formValues.information) {
      issues.push({ message: 'Information is required', path: ['information'] });
    }
    if (!formValues.avis) {
      issues.push({ message: 'Avis is required', path: ['avis'] });
    }
    if (!formValues.design) {
      issues.push({ message: 'Design is required', path: ['design'] });
    }
    if (!formValues.banner) {
      issues.push({ message: 'Banner is required', path: ['banner'] });
    }
    if (formValues.pictures && formValues.pictures.length > 4) {
      issues.push({ message: 'Maximum 4 pictures allowed', path: ['pictures'] });
    }
    return { issues };
  },
};

const artifactsCache = new DataSourceCache();

function matchPath(pattern, pathname) {
  const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, '([^/]+)')}$`);
  const match = pathname.match(regex);
  return match ? match[1] : null;
}

function CrudArtifacts(props) {
  const { window } = props;
  const router = useDemoRouter('/artifacts');
  const demoWindow = window !== undefined ? window() : undefined;
  const showArtifactId = matchPath('/artifacts/:artifactId', router.pathname);
  const editArtifactId = matchPath('/artifacts/:artifactId/edit', router.pathname);
  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout defaultSidebarCollapsed>
          {/* preview-start */}
          <Crud
            dataSource={artifactsDataSource}
            dataSourceCache={artifactsCache}
            rootPath="/artifacts"
            initialPageSize={10}
            pageSizeOptions={[10, 25, 50]}
            getRowId={(row) => row._id}
            defaultValues={{ title: 'New artifact' }}
            pageTitles={{
              create: 'New Artifact',
              edit: `Artifact ${editArtifactId} - Edit`,
              show: `Artifact ${showArtifactId}`,
            }}
          />
          {/* preview-end */}
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

CrudArtifacts.propTypes = {
  window: PropTypes.func,
};

export default CrudArtifacts;
