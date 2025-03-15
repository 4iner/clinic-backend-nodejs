export enum PlasticSurgeryProcedure {
  FACE_LIFT = 'Face lift',
  BROW_LIFT = 'Brow/Forehead lift',
  EYELID_LIFT = 'Eyelid lift',
  EAR_PINNING = 'Ear pinning',
  EAR_RESHAPING = 'Ear reshaping',
  HAIR_REPLACEMENT = 'Hair replacement surgery',
  NASAL_SURGERY = 'Nasal surgery',
  NOSE_RESHAPING = 'Nose reshaping',
  CHIN_RESHAPING = 'Chin/Cheek/Jaw reshaping',
  LIP_AUGMENTATION = 'Lip augmentation',
  CLEFT_LIP = 'Cleft lip and Cleft palate',
  CRANIOSYNOSTOSIS = 'Craniosynostosis',
  ORAL_SURGERY = 'Oral and/or maxillofacial surgery',
  BREAST_AUGMENTATION = 'Breast augmentation',
  BREAST_RECONSTRUCTION = 'Breast reconstruction',
  BREAST_REDUCTION = 'Breast reduction',
  BREAST_LIFT = 'Breast lift',
  TUMMY_TUCK = 'Abdominoplasty/Tummy tuck',
  LIPOSUCTION = 'Liposuction',
  CHASE_HAND = 'Chase Hand & Upper Limb Center',
  CHEMICAL_PEEL = 'Chemical peel',
  DERMABRASION = 'Dermabrasion/Dermaplaning',
  COLLAGEN = 'Collagen/fat injectible fillers',
  BOTOX = 'Botox/filler injections',
  GLYCOLIC_PEELS = 'Glycolic peels',
  LASER_PEELS = 'Laser peels',
  VEIN_REMOVAL = 'Vein removal',
  SCAR_REVISION = 'Scar revision',
  TATTOO_REMOVAL = 'Tattoo removal',
  FOLLOW_UP = 'Follow up'
}

// Helper function to get all procedures with their display names
export function getProceduresList(): Array<{ value: PlasticSurgeryProcedure; label: string }> {
  return Object.entries(PlasticSurgeryProcedure).map(([key, value]) => ({
    value: PlasticSurgeryProcedure[key as keyof typeof PlasticSurgeryProcedure],
    label: value
  }));
} 