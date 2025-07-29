import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Template, templateService, TemplateContent } from '../services/templateService';

interface TemplateState {
  selectedTemplate: string | null;
  templates: Template[];
  editorContent: {
    html: string;
    bodyContent: string;
    css: string;
  };
  fullHtml: string;
  loading: boolean;
  error: string | null;
  templateContentLoading: boolean;
}

const initialState: TemplateState = {
  selectedTemplate: null,
  templates: [],
  editorContent: {
    html: '',
    bodyContent: '',
    css: ''
  },
  fullHtml: '',
  loading: false,
  error: null,
  templateContentLoading: false
};

// Async thunk for fetching templates
export const fetchTemplates = createAsyncThunk(
  'template/fetchTemplates',
  async () => {
    const templates = await templateService.fetchTemplates();
    return templates;
  }
);

// Async thunk for fetching template content
export const fetchTemplateContent = createAsyncThunk(
  'template/fetchTemplateContent',
  async (template: Template) => {
    const content = await templateService.fetchTemplateContent(template);
    return { templateId: template.id, content };
  }
);


const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    selectTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload;
    },
    updateEditorContent: (state, action: PayloadAction<{ html: string; bodyContent: string; css: string }>) => {
      state.editorContent = action.payload;
    },
    clearCurrentState: (state) => {
      state.selectedTemplate = null;
      state.editorContent = { html: '', bodyContent: '', css: '' };
      state.fullHtml = '';
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch templates
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch templates';
      })
      // Fetch template content
      .addCase(fetchTemplateContent.pending, (state) => {
        state.templateContentLoading = true;
        state.error = null;
      })
      .addCase(fetchTemplateContent.fulfilled, (state, action) => {
        state.templateContentLoading = false;
        state.editorContent = {
          html: action.payload.content.bodyContent,
          bodyContent: action.payload.content.bodyContent,
          css: action.payload.content.css
        };
        state.fullHtml = action.payload.content.html;
      })
      .addCase(fetchTemplateContent.rejected, (state, action) => {
        state.templateContentLoading = false;
        state.error = action.error.message || 'Failed to fetch template content';
      });
  }
});

export const { selectTemplate, updateEditorContent, clearCurrentState, clearError } = templateSlice.actions;
export default templateSlice.reducer;