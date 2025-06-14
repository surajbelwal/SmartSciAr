export const chemistryModels = {
  atom: {
    id: "atom",
    title: "Atom",
    sketchfabUrl:
      "https://sketchfab.com/3d-models/atom-6a283d5b19c34e2b8fcfc6907b231aea",
    // Extract the model ID from the URL and create embed URL
    embedUrl:
      "https://sketchfab.com/models/6a283d5b19c34e2b8fcfc6907b231aea/embed",
    description: [
      "• Basic building block of matter",
      "• Consists of a central nucleus and orbiting electrons",
      "• Nucleus contains protons (positively charged) and neutrons (neutral)",
      "• Electrons orbit in specific energy levels around the nucleus",
      "• Number of protons determines the element type",
      "• Electron arrangement determines chemical properties",
      "• Atoms combine to form molecules and compounds",
    ],
  },
  // Add more models here later
};

// Helper function to get model by ID
export const getModelById = (id) => {
  return chemistryModels[id];
};

// Helper function to get all models
export const getAllModels = () => {
  return Object.values(chemistryModels);
};
