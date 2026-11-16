export const PROJECT_METRICS = {
  institution: "KPR Institute of Engineering and Technology (KPRIET), Coimbatore",
  department: "Department of Computer Science and Engineering",
  authors: [
    { name: "Ms. Sasikala C", role: "Project Mentor / Guide" },
    { name: "Sriragul S", role: "Lead Developer / Researcher" },
    { name: "Yadaw K", role: "Core Contributor / Researcher" },
    { name: "Thangapandi E", role: "Core Contributor / Researcher" }
  ],
  classifier: {
    name: "ResNet-18 (Fine-Tuned)",
    backbone: "ImageNet Pretrained with Dropout(0.3) -> Linear(512, 2)",
    dataset: "Sentinel-1 SAR Oil Spill Detection Dataset (Kaggle)",
    samples: 5630,
    splitBreakdown: "3,725 Clean Water (Class 0) | 1,905 Oil Spill (Class 1)",
    checkpoint: "models/oil_spill_classifier.pth",
    metrics: {
      accuracy: 97.69,
      recall: 98.16,
      precision: 95.17,
      f1Score: 0.9664,
      rocAuc: 0.9977,
      falseNegatives: "7 missed out of 381 test spills"
    },
    status: "Model Evaluated"
  },
  segmenter: {
    name: "4-Stage Symmetric U-Net",
    architecture: "32 -> 64 -> 128 -> 256 -> 512 channels with Skip Connections",
    dataset: "Deep-SAR SOS Oil Spill Segmentation Dataset",
    samples: 8070,
    splitBreakdown: "6,455 Train + 1,615 Val pairs (256x256 px)",
    checkpoint: "models/oil_spill_segmentation.pth",
    loss: "0.5 * BCE + 0.5 * Dice Loss",
    metrics: {
      dice: 0.7985,
      mIoU: 0.6684,
      pixelAccuracy: 89.17,
      pixelRecall: 85.67,
      pixelPrecision: 75.49
    },
    status: "Model Evaluated"
  }
};

export const DATASETS_INFO = [
  {
    id: "sentinel-1-classification",
    title: "Sentinel-1 SAR Detection Dataset (Kaggle)",
    role: "Model 1 Classification Training & Validation",
    size: "5,630 Images (400x400 px)",
    modality: "C-band Sentinel-1 GRD Synthetic Aperture Radar",
    description: "3,725 clean ocean patches and 1,905 oil spill patches used to train the ResNet-18 screening filter.",
    status: "Model Evaluated"
  },
  {
    id: "deep-sar-sos",
    title: "Deep-SAR SOS Segmentation Dataset",
    role: "Model 2 U-Net Pixel Boundary Delineation",
    size: "8,070 Image-Mask Pairs (256x256 px)",
    modality: "SAR intensity paired with hand-annotated binary masks",
    description: "6,455 training and 1,615 validation pairs used to train the 4-stage U-Net architecture with combined BCE+Dice loss.",
    status: "Model Evaluated"
  },
  {
    id: "csiro-benchmark",
    title: "CSIRO Sentinel-1 Oil/No-Oil Dataset",
    role: "External Generalization Benchmark",
    size: "5,538 Images (3,695 Clean / 1,843 Spill)",
    modality: "Dual-polarization Sentinel-1 VV/VH imagery",
    description: "External benchmark reserved strictly for zero-data-leakage testing across different oceanic regions.",
    status: "External Benchmark"
  },
  {
    id: "uav-drone",
    title: "Oil Spill Drone Dataset (Zenodo)",
    role: "High-Resolution Coastal & Shallow Water UAV Analysis",
    size: "1,268 1080p Orthomosaics + Masks",
    modality: "High-resolution Optical Drone RGB Imagery",
    description: "Validates high-resolution near-shore oil slicks where shallow bathymetry distorts SAR backscatter.",
    status: "UAV Validation"
  },
  {
    id: "noaa-historical",
    title: "NOAA Historical Marine Incident Dataset",
    role: "Geospatial Prior & Spatial Validation",
    size: "4,929 Documented Records",
    modality: "Tabular spatio-temporal logs (GPS, volume, commodity type)",
    description: "Provides spatial context by mapping satellite anomalies to historical tanker routes and offshore rigs.",
    status: "Historical Reference"
  }
];

export const ARCHITECTURE_PIPELINE = [
  {
    id: 1,
    pillar: "Pillar 1: Input",
    title: "Satellite SAR & Drone Acquisition",
    script: "Copernicus Hub API / Drone Stream",
    status: "Implemented",
    inputs: "Sentinel-1 C-band SAR granules & 1080p drone RGB",
    outputs: "Calibrated SAR backscatter matrix",
    summary: "Acquires marine surface observations through cloud cover and night conditions."
  },
  {
    id: 2,
    pillar: "Pillar 1: Input",
    title: "Radiometric Preprocessing & Filtering",
    script: "inspect_dataset.py & radiometric scaling",
    status: "Implemented",
    inputs: "Raw 16-bit SAR intensity",
    outputs: "Normalized 256x256 FP16 float tensors",
    summary: "Suppresses multiplicative speckle noise using Lee filtering and decibel scaling."
  },
  {
    id: 3,
    pillar: "Pillar 2: AI Processing",
    title: "ResNet-18 Rapid Binary Screening",
    script: "src/predict.py (models/oil_spill_classifier.pth)",
    status: "Model Evaluated",
    inputs: "Preprocessed 256x256 image patch",
    outputs: "Binary class (0: Clean Water, 1: Oil Spill)",
    summary: "Filters clean ocean patches instantly (97.69% accuracy, 98.16% recall) to conserve compute."
  },
  {
    id: 4,
    pillar: "Pillar 2: AI Processing",
    title: "4-Stage U-Net Pixel Boundary Delineation",
    script: "src/train_segmentation.py (models/oil_spill_segmentation.pth)",
    status: "Model Evaluated",
    inputs: "Flagged positive spill patch",
    outputs: "256x256 Binary Pixel Mask (P)",
    summary: "Generates pixel-accurate slick boundaries with skip connections (Dice: 0.7985, mIoU: 0.6684)."
  },
  {
    id: 5,
    pillar: "Pillar 2: AI Processing",
    title: "Hydrocarbon Oil-Type Classifier",
    script: "src/oil_type.py",
    status: "Implemented",
    inputs: "Damping depth profile & SAR texture variance",
    outputs: "Oil class: Crude Oil, Fuel Oil, Diesel, or Surface Sheen",
    summary: "Distinguishes heavy crude damping from biogenic look-alikes and thin diesel slicks."
  },
  {
    id: 6,
    pillar: "Pillar 3: Decision & Verification",
    title: "Severity & Area Estimation Engine",
    script: "src/severity.py",
    status: "Implemented",
    inputs: "Binary segmentation mask & 10m GSD metadata",
    outputs: "Pixel coverage %, physical km², 5-Tier Severity rating",
    summary: "Calculates spatial extent and assigns risk tier from Minor (<1%) to Critical (>30%)."
  },
  {
    id: 7,
    pillar: "Pillar 3: Decision & Verification",
    title: "Geospatial & NOAA Correlator",
    script: "src/geolocation.py",
    status: "Implemented",
    inputs: "Image GPS coordinate bounding box",
    outputs: "Proximity to 4,929 NOAA historical records & shipping lanes",
    summary: "Validates if the detected slick aligns with documented maritime corridors."
  },
  {
    id: 8,
    pillar: "Pillar 3: Decision & Verification",
    title: "Decision Engine & Risk Score",
    script: "src/decision_engine.py",
    status: "Implemented",
    inputs: "Area km², severity tier, simulated buoy PPM telemetry",
    outputs: "Composite Environmental Risk Score (0 - 100%)",
    summary: "Synthesizes multi-source data into a defensible environmental danger index."
  },
  {
    id: 9,
    pillar: "Pillar 4: Alert & Response",
    title: "FastAPI Microservice",
    script: "api/main.py (Port 8000)",
    status: "Implemented",
    inputs: "HTTP POST /predict with image payload",
    outputs: "JSON result: prediction, mask tensor, risk score",
    summary: "Exposes REST endpoints consumed by operations dashboards and emergency responders."
  },
  {
    id: 10,
    pillar: "Pillar 4: Alert & Response",
    title: "Simulated MQTT Telemetry Broker",
    script: "Simulated MQTT broker loop",
    status: "Simulated Workflow",
    inputs: "Virtual ocean buoy telemetry (Hydrocarbon ppm, SST)",
    outputs: "Live MQTT JSON telemetry stream",
    summary: "Cross-checks satellite detections with in-situ surface buoy readings."
  },
  {
    id: 11,
    pillar: "Pillar 4: Alert & Response",
    title: "Intelligent Maritime Alert Dispatch",
    script: "SMS / Email dispatch module",
    status: "Simulated Workflow",
    inputs: "Verified Tier 4 or Tier 5 incidents",
    outputs: "Automated SMS / Email dispatch payloads to Port Authorities",
    summary: "Generates formatted emergency dispatch alerts for Coast Guard and disaster teams."
  }
];

export const MOCK_INCIDENTS = [
  {
    id: "INC-2026-081",
    name: "Coromandel Tanker Corridor Spill",
    location: "Bay of Bengal (Off Chennai Port)",
    coordinates: [13.12, 80.35],
    status: "Simulated Verification",
    severity: "Severe (Tier 4)",
    severityColor: "text-amber-400 bg-amber-950/80 border-amber-600/40",
    coverageRatio: "14.8% (~18.4 km²)",
    confidence: "98.16%",
    oilType: "Heavy Crude Oil (High Damping)",
    buoyReading: "42.1 ppm (Contamination Confirmed)",
    riskScore: 84,
    timestamp: "2026-10-10 03:45 UTC"
  },
  {
    id: "INC-2026-044",
    name: "Gulf of Mannar Ecological Boundary",
    location: "Gulf of Mannar Biosphere Reserve",
    coordinates: [9.15, 79.12],
    status: "Simulated Verification",
    severity: "Moderate (Tier 2)",
    severityColor: "text-cyan-400 bg-cyan-950/80 border-cyan-600/40",
    coverageRatio: "3.2% (~3.9 km²)",
    confidence: "94.70%",
    oilType: "Diesel / Light Fuel",
    buoyReading: "9.2 ppm (Slight Elevation)",
    riskScore: 42,
    timestamp: "2026-10-09 17:15 UTC"
  },
  {
    id: "NOAA-HIST-3104",
    name: "NOAA Ground-Truth Reference Marker",
    location: "Global Shipping Lane Reference",
    coordinates: [11.85, 82.40],
    status: "NOAA Historical Archive",
    severity: "Critical (Tier 5)",
    severityColor: "text-rose-400 bg-rose-950/80 border-rose-600/40",
    coverageRatio: "32.6% (~41.2 km²)",
    confidence: "Archived Ground Truth",
    oilType: "Bunker C Fuel Oil",
    buoyReading: "Historical Archive Record",
    riskScore: 96,
    timestamp: "NOAA Archive Incident"
  }
];

export const MENTOR_PRESENTATION_SLIDES = [
  {
    step: 1,
    title: "1. The Marine Oil Spill Challenge",
    subtitle: "Ecological and Economic Threat to Coastal India",
    bullets: [
      "Marine oil spills devastate coastal fisheries, coral biospheres, and maritime operations.",
      "Manual and optical satellite detection fails during heavy monsoon cloud cover and nighttime.",
      "Sentinel-1 Synthetic Aperture Radar (SAR) provides all-weather, day-and-night active radar imaging."
    ],
    takeaway: "SAR is required for all-weather surveillance, but raw backscatter contains challenging ocean look-alikes."
  },
  {
    step: 2,
    title: "2. The Research Gap in Existing Literature",
    subtitle: "Why Detection-Only CNNs Fall Short",
    bullets: [
      "Most prior studies only perform binary classification, which tells authorities an image contains oil but provides no location or boundary data.",
      "Stand-alone segmentation models are computationally expensive and trigger false positives on clean-water patches.",
      "No existing open-source framework bridges deep learning with in-situ IoT buoy verification and automated port alerting."
    ],
    takeaway: "An integrated two-stage AI funnel coupled with risk assessment and IoT verification is necessary."
  },
  {
    step: 3,
    title: "3. The 4-Tier KPRIET Architectural Blueprint",
    subtitle: "From Satellite Orbit to Coast Guard Dispatch",
    bullets: [
      "Pillar 1 (Input): Sentinel-1 SAR and drone RGB ingestion with radiometric speckle filtering.",
      "Pillar 2 (AI): ResNet-18 rapid classifier followed by 4-stage U-Net pixel-level boundary segmentation.",
      "Pillar 3 (Decision): Area calculation (km²), 5-tier severity classification, and NOAA historical cross-checking.",
      "Pillar 4 (Alerting): FastAPI microservice, simulated MQTT buoy telemetries, and automated dispatch drafts."
    ],
    takeaway: "The framework offers a closed-loop system connecting raw satellite inputs directly to emergency action."
  },
  {
    step: 4,
    title: "4. Model 1: ResNet-18 Rapid Classifier",
    subtitle: "Validated on 5,630 Sentinel-1 SAR Samples",
    bullets: [
      "Backbone: ImageNet pretrained ResNet-18 with Dropout(0.3) and Linear(512, 2) head.",
      "FP16 Automatic Mixed Precision (AMP) enables fast, low-memory inference on our NVIDIA RTX 2050 GPU.",
      "Class Weight: 1.96 dynamic penalty on oil spills to prevent missed slicks in operational surveillance."
    ],
    takeaway: "Achieved 97.69% validation accuracy and 98.16% recall, with only 7 missed spills out of 381."
  },
  {
    step: 5,
    title: "5. Model 2: 4-Stage Symmetric U-Net",
    subtitle: "Validated on 8,070 Deep-SAR SOS Pairs",
    bullets: [
      "Architecture: 32 -> 64 -> 128 -> 256 -> 512 channels with skip connections preserving spatial resolution.",
      "Trained using combined Binary Cross-Entropy (0.5) and Dice Loss (0.5).",
      "Pixel Accuracy alone is misleading due to 85%+ background ocean; Dice and IoU confirm true mask overlap."
    ],
    takeaway: "Delivers a Dice Coefficient of 0.7985, Mean IoU of 0.6684, and 89.17% pixel accuracy."
  },
  {
    step: 6,
    title: "6. Severity Triage & Oil Type Fingerprinting",
    subtitle: "src/severity.py and src/oil_type.py",
    bullets: [
      "Area Estimation: Converts positive mask pixels to physical km² using 10m Ground Sampling Distance (GSD).",
      "5 Severity Tiers: Minor (<1%), Moderate (1-5%), Significant (5-15%), Severe (15-30%), Critical (>30%).",
      "Radiometric Analysis: Classifies crude oil, bunker fuel, diesel, and surface sheen by backscatter damping depth."
    ],
    takeaway: "Converts raw segmentation tensors into clear operational threat levels for incident response."
  },
  {
    step: 7,
    title: "7. IoT Buoy Verification & Decision Engine",
    subtitle: "src/decision_engine.py & MQTT Broker Simulation",
    bullets: [
      "Satellite detections are cross-verified with simulated marine buoy telemetry (dissolved hydrocarbons in PPM).",
      "Buoy readings > 25 ppm confirm active crude release and rule out low-wind SAR look-alikes.",
      "Composite Environmental Risk Score (0-100) integrates area, confidence, proximity, and sensor verification."
    ],
    takeaway: "Cross-checks satellite imagery with surface ocean telemetry to suppress false alerts."
  },
  {
    step: 8,
    title: "8. Operational Microservice & Dispatch",
    subtitle: "FastAPI REST API (Port 8000) & Alert Dispatch",
    bullets: [
      "api/main.py serves endpoints: /predict, /health, and /historical-incidents.",
      "Verified Tier 4 and 5 spills trigger automated emergency alert drafts containing GPS, risk tier, and oil type.",
      "Alert drafts are formatted for delivery via SMS/Email to port authorities and the Indian Coast Guard."
    ],
    takeaway: "The backend is fully implemented and accessible via Swagger at http://127.0.0.1:8000/docs."
  },
  {
    step: 9,
    title: "9. Scientific Integrity & Project Status",
    subtitle: "What is Implemented vs. What is Proposed/Simulated",
    bullets: [
      "Implemented & Evaluated: ResNet-18, U-Net, FastAPI backend, Decision Engine, and the React operations UI.",
      "Simulated Demonstration: In-situ buoy MQTT telemetry and final SMS/Email responder dispatch.",
      "Planned Future Integration: Direct live satellite orbital APIs and physical in-water sensor hardware."
    ],
    takeaway: "Maintains clear scientific boundaries between evaluated AI models and simulated operational systems."
  },
  {
    step: 10,
    title: "10. Conclusion & Future Roadmap",
    subtitle: "Final Year Review 3 Deliverables",
    bullets: [
      "Completed both classification and segmentation milestones with high recall (98.16%) and Dice (0.7985).",
      "Designed an end-to-end framework addressing the primary limitations of detection-only systems.",
      "Future work includes edge-device deployment using MobileNetV3 (<4 MB footprint) on marine patrol vessels."
    ],
    takeaway: "The research objectives defined at KPRIET have been achieved and validated."
  }
];