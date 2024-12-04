import sf from '../safeTraverse'

const getModulesChapters = (courseInfo) => {
  const modules = sf(courseInfo, ['curriculum', 'section_details']) || [];
  const chapters = modules.length ? modules
    .reduce((accumulator, module = {}) => [
      ...accumulator, ...getChapters(module)
    ], []) : [];
  return {
    modulesCount: modules.length || 3,
    chaptersCount: chapters.length || 3
  }
}

const getChapters = module => (module.sub_sections ? module.sub_sections : []);

export { getModulesChapters }  // eslint-disable-line
