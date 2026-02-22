// AI Glossary Database - Inspired by theresanaiforthat.com
// 300+ AI Terms with definitions

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  definitionEs: string;
  category: GlossaryCategory;
  relatedTerms: string[];
}

export type GlossaryCategory = 
  | "ai-fundamentals"
  | "machine-learning"
  | "deep-learning"
  | "nlp"
  | "computer-vision"
  | "data-science"
  | "neural-networks"
  | "generative-ai"
  | "ethics"
  | "applications";

export const glossaryCategories: { id: GlossaryCategory; name: string; nameEs: string }[] = [
  { id: "ai-fundamentals", name: "AI Fundamentals", nameEs: "Fundamentos de IA" },
  { id: "machine-learning", name: "Machine Learning", nameEs: "Aprendizaje Automático" },
  { id: "deep-learning", name: "Deep Learning", nameEs: "Aprendizaje Profundo" },
  { id: "nlp", name: "Natural Language Processing", nameEs: "Procesamiento de Lenguaje Natural" },
  { id: "computer-vision", name: "Computer Vision", nameEs: "Visión por Computadora" },
  { id: "data-science", name: "Data Science", nameEs: "Ciencia de Datos" },
  { id: "neural-networks", name: "Neural Networks", nameEs: "Redes Neuronales" },
  { id: "generative-ai", name: "Generative AI", nameEs: "IA Generativa" },
  { id: "ethics", name: "AI Ethics", nameEs: "Ética de IA" },
  { id: "applications", name: "Applications", nameEs: "Aplicaciones" },
];

export const glossaryTerms: GlossaryTerm[] = [
  // AI FUNDAMENTALS
  {
    id: "artificial-intelligence",
    term: "Artificial Intelligence (AI)",
    definition: "The simulation of human intelligence processes by machines, especially computer systems, including learning, reasoning, and self-correction.",
    definitionEs: "La simulación de procesos de inteligencia humana por máquinas, especialmente sistemas informáticos, incluyendo aprendizaje, razonamiento y autocorrección.",
    category: "ai-fundamentals",
    relatedTerms: ["machine-learning", "deep-learning", "agi"],
  },
  {
    id: "agi",
    term: "Artificial General Intelligence (AGI)",
    definition: "A hypothetical form of AI that would match or exceed human-level intelligence across virtually all domains, capable of any intellectual task a human can perform.",
    definitionEs: "Una forma hipotética de IA que igualaría o superaría la inteligencia de nivel humano en prácticamente todos los dominios, capaz de realizar cualquier tarea intelectual que un humano pueda realizar.",
    category: "ai-fundamentals",
    relatedTerms: ["artificial-intelligence", "narrow-ai", "superintelligence"],
  },
  {
    id: "narrow-ai",
    term: "Narrow AI (Weak AI)",
    definition: "AI systems designed to perform a specific task or set of tasks, as opposed to general AI that can handle any intellectual task.",
    definitionEs: "Sistemas de IA diseñados para realizar una tarea específica o un conjunto de tareas, a diferencia de la IA general que puede manejar cualquier tarea intelectual.",
    category: "ai-fundamentals",
    relatedTerms: ["artificial-intelligence", "agi"],
  },
  {
    id: "superintelligence",
    term: "Superintelligence",
    definition: "A hypothetical agent that possesses intelligence far surpassing that of the brightest and most gifted human minds.",
    definitionEs: "Un agente hipotético que posee una inteligencia muy superior a la de las mentes humanas más brillantes y dotadas.",
    category: "ai-fundamentals",
    relatedTerms: ["agi", "artificial-intelligence"],
  },
  {
    id: "cognitive-computing",
    term: "Cognitive Computing",
    definition: "Systems that simulate human thought processes in complex situations where answers may be ambiguous or uncertain.",
    definitionEs: "Sistemas que simulan procesos de pensamiento humano en situaciones complejas donde las respuestas pueden ser ambiguas o inciertas.",
    category: "ai-fundamentals",
    relatedTerms: ["artificial-intelligence", "neural-networks"],
  },
  {
    id: "expert-system",
    term: "Expert System",
    definition: "A computer system that emulates the decision-making ability of a human expert, typically using rules and knowledge bases.",
    definitionEs: "Un sistema informático que emula la capacidad de toma de decisiones de un experto humano, típicamente usando reglas y bases de conocimiento.",
    category: "ai-fundamentals",
    relatedTerms: ["knowledge-base", "inference-engine"],
  },
  {
    id: "knowledge-base",
    term: "Knowledge Base",
    definition: "A technology used to store complex structured and unstructured information used by a computer system.",
    definitionEs: "Una tecnología utilizada para almacenar información estructurada y no estructurada compleja utilizada por un sistema informático.",
    category: "ai-fundamentals",
    relatedTerms: ["expert-system", "knowledge-graph"],
  },
  {
    id: "inference-engine",
    term: "Inference Engine",
    definition: "The component of an AI system that applies logical rules to a knowledge base to deduce new information.",
    definitionEs: "El componente de un sistema de IA que aplica reglas lógicas a una base de conocimiento para deducir nueva información.",
    category: "ai-fundamentals",
    relatedTerms: ["expert-system", "reasoning"],
  },
  {
    id: "reasoning",
    term: "Reasoning",
    definition: "The process of drawing conclusions from available information using logical rules, a core capability of AI systems.",
    definitionEs: "El proceso de sacar conclusiones de la información disponible usando reglas lógicas, una capacidad central de los sistemas de IA.",
    category: "ai-fundamentals",
    relatedTerms: ["inference-engine", "knowledge-base"],
  },
  {
    id: "symbolic-ai",
    term: "Symbolic AI",
    definition: "An approach to AI based on high-level, human-readable symbolic representations of problems and logic.",
    definitionEs: "Un enfoque de IA basado en representaciones simbólicas de alto nivel y legibles por humanos de problemas y lógica.",
    category: "ai-fundamentals",
    relatedTerms: ["expert-system", "knowledge-base"],
  },

  // MACHINE LEARNING
  {
    id: "machine-learning",
    term: "Machine Learning (ML)",
    definition: "A subset of AI that enables systems to learn and improve from experience without being explicitly programmed.",
    definitionEs: "Un subconjunto de IA que permite a los sistemas aprender y mejorar de la experiencia sin ser programados explícitamente.",
    category: "machine-learning",
    relatedTerms: ["deep-learning", "supervised-learning", "unsupervised-learning"],
  },
  {
    id: "supervised-learning",
    term: "Supervised Learning",
    definition: "A type of machine learning where the model learns from labeled training data to make predictions or decisions.",
    definitionEs: "Un tipo de aprendizaje automático donde el modelo aprende de datos de entrenamiento etiquetados para hacer predicciones o decisiones.",
    category: "machine-learning",
    relatedTerms: ["unsupervised-learning", "reinforcement-learning", "classification"],
  },
  {
    id: "unsupervised-learning",
    term: "Unsupervised Learning",
    definition: "A type of machine learning where the model finds patterns in unlabeled data without predefined outputs.",
    definitionEs: "Un tipo de aprendizaje automático donde el modelo encuentra patrones en datos no etiquetados sin salidas predefinidas.",
    category: "machine-learning",
    relatedTerms: ["supervised-learning", "clustering", "dimensionality-reduction"],
  },
  {
    id: "reinforcement-learning",
    term: "Reinforcement Learning",
    definition: "A type of machine learning where an agent learns to make decisions by receiving rewards or penalties for actions.",
    definitionEs: "Un tipo de aprendizaje automático donde un agente aprende a tomar decisiones recibiendo recompensas o penalizaciones por acciones.",
    category: "machine-learning",
    relatedTerms: ["supervised-learning", "agent", "reward-function"],
  },
  {
    id: "classification",
    term: "Classification",
    definition: "A supervised learning task of predicting the category or class of given data points.",
    definitionEs: "Una tarea de aprendizaje supervisado de predecir la categoría o clase de puntos de datos dados.",
    category: "machine-learning",
    relatedTerms: ["regression", "supervised-learning", "predictive-modeling"],
  },
  {
    id: "regression",
    term: "Regression",
    definition: "A supervised learning task of predicting continuous numerical values based on input features.",
    definitionEs: "Una tarea de aprendizaje supervisado de predecir valores numéricos continuos basados en características de entrada.",
    category: "machine-learning",
    relatedTerms: ["classification", "supervised-learning", "predictive-modeling"],
  },
  {
    id: "clustering",
    term: "Clustering",
    definition: "An unsupervised learning technique that groups similar data points together based on their characteristics.",
    definitionEs: "Una técnica de aprendizaje no supervisado que agrupa puntos de datos similares según sus características.",
    category: "machine-learning",
    relatedTerms: ["unsupervised-learning", "k-means", "segmentation"],
  },
  {
    id: "training-data",
    term: "Training Data",
    definition: "The dataset used to train a machine learning model, consisting of input-output pairs for learning.",
    definitionEs: "El conjunto de datos usado para entrenar un modelo de aprendizaje automático, consistiendo en pares entrada-salida para el aprendizaje.",
    category: "machine-learning",
    relatedTerms: ["test-data", "validation-data", "data-splitting"],
  },
  {
    id: "test-data",
    term: "Test Data",
    definition: "A separate dataset used to evaluate the performance of a trained machine learning model.",
    definitionEs: "Un conjunto de datos separado usado para evaluar el rendimiento de un modelo de aprendizaje automático entrenado.",
    category: "machine-learning",
    relatedTerms: ["training-data", "validation-data", "model-evaluation"],
  },
  {
    id: "overfitting",
    term: "Overfitting",
    definition: "When a model learns the training data too well, including noise, leading to poor generalization on new data.",
    definitionEs: "Cuando un modelo aprende los datos de entrenamiento demasiado bien, incluyendo ruido, llevando a una mala generalización en nuevos datos.",
    category: "machine-learning",
    relatedTerms: ["underfitting", "regularization", "bias-variance"],
  },
  {
    id: "underfitting",
    term: "Underfitting",
    definition: "When a model is too simple to capture the underlying patterns in the data, resulting in poor performance.",
    definitionEs: "Cuando un modelo es demasiado simple para capturar los patrones subyacentes en los datos, resultando en bajo rendimiento.",
    category: "machine-learning",
    relatedTerms: ["overfitting", "model-complexity", "bias-variance"],
  },
  {
    id: "feature-extraction",
    term: "Feature Extraction",
    definition: "The process of selecting and transforming raw data into features that can be used in machine learning models.",
    definitionEs: "El proceso de seleccionar y transformar datos sin procesar en características que pueden usarse en modelos de aprendizaje automático.",
    category: "machine-learning",
    relatedTerms: ["feature-engineering", "dimensionality-reduction", "preprocessing"],
  },
  {
    id: "feature-engineering",
    term: "Feature Engineering",
    definition: "The process of using domain knowledge to create features that make machine learning algorithms work better.",
    definitionEs: "El proceso de usar conocimiento del dominio para crear características que hacen que los algoritmos de aprendizaje automático funcionen mejor.",
    category: "machine-learning",
    relatedTerms: ["feature-extraction", "preprocessing", "data-preparation"],
  },
  {
    id: "hyperparameter",
    term: "Hyperparameter",
    definition: "Parameters whose values are set before the learning process begins, controlling the learning algorithm behavior.",
    definitionEs: "Parámetros cuyos valores se establecen antes de que comience el proceso de aprendizaje, controlando el comportamiento del algoritmo.",
    category: "machine-learning",
    relatedTerms: ["model-tuning", "hyperparameter-optimization", "grid-search"],
  },
  {
    id: "cross-validation",
    term: "Cross-Validation",
    definition: "A technique to evaluate model performance by splitting data into multiple training and validation sets.",
    definitionEs: "Una técnica para evaluar el rendimiento del modelo dividiendo los datos en múltiples conjuntos de entrenamiento y validación.",
    category: "machine-learning",
    relatedTerms: ["model-evaluation", "k-fold", "validation-data"],
  },
  {
    id: "ensemble-learning",
    term: "Ensemble Learning",
    definition: "A technique that combines multiple models to improve prediction accuracy and reduce overfitting.",
    definitionEs: "Una técnica que combina múltiples modelos para mejorar la precisión de predicción y reducir el sobreajuste.",
    category: "machine-learning",
    relatedTerms: ["random-forest", "boosting", "bagging"],
  },
  {
    id: "random-forest",
    term: "Random Forest",
    definition: "An ensemble learning method that constructs multiple decision trees and outputs the mode or mean prediction.",
    definitionEs: "Un método de aprendizaje por conjuntos que construye múltiples árboles de decisión y produce la predicción modal o media.",
    category: "machine-learning",
    relatedTerms: ["decision-tree", "ensemble-learning", "bagging"],
  },
  {
    id: "decision-tree",
    term: "Decision Tree",
    definition: "A flowchart-like model that makes decisions based on a series of if-then rules learned from data.",
    definitionEs: "Un modelo similar a un diagrama de flujo que toma decisiones basadas en una serie de reglas si-entonces aprendidas de los datos.",
    category: "machine-learning",
    relatedTerms: ["random-forest", "classification", "regression"],
  },
  {
    id: "gradient-descent",
    term: "Gradient Descent",
    definition: "An optimization algorithm used to minimize the cost function by iteratively moving toward the minimum.",
    definitionEs: "Un algoritmo de optimización usado para minimizar la función de costo moviéndose iterativamente hacia el mínimo.",
    category: "machine-learning",
    relatedTerms: ["optimization", "cost-function", "learning-rate"],
  },
  {
    id: "learning-rate",
    term: "Learning Rate",
    definition: "A hyperparameter that controls how much to change the model in response to the estimated error each update.",
    definitionEs: "Un hiperparámetro que controla cuánto cambiar el modelo en respuesta al error estimado en cada actualización.",
    category: "machine-learning",
    relatedTerms: ["gradient-descent", "hyperparameter", "optimization"],
  },
  {
    id: "cost-function",
    term: "Cost Function (Loss Function)",
    definition: "A function that measures the difference between predicted and actual values, used to optimize model parameters.",
    definitionEs: "Una función que mide la diferencia entre valores predichos y reales, usada para optimizar los parámetros del modelo.",
    category: "machine-learning",
    relatedTerms: ["optimization", "gradient-descent", "error-metrics"],
  },

  // DEEP LEARNING
  {
    id: "deep-learning",
    term: "Deep Learning",
    definition: "A subset of machine learning using neural networks with multiple layers to learn complex patterns from data.",
    definitionEs: "Un subconjunto del aprendizaje automático que usa redes neuronales con múltiples capas para aprender patrones complejos de los datos.",
    category: "deep-learning",
    relatedTerms: ["neural-networks", "machine-learning", "cnn"],
  },
  {
    id: "neural-network",
    term: "Neural Network",
    definition: "A computing system inspired by biological neural networks, consisting of interconnected nodes organized in layers.",
    definitionEs: "Un sistema de computación inspirado en redes neuronales biológicas, consistiendo en nodos interconectados organizados en capas.",
    category: "deep-learning",
    relatedTerms: ["deep-learning", "perceptron", "activation-function"],
  },
  {
    id: "cnn",
    term: "Convolutional Neural Network (CNN)",
    definition: "A type of neural network designed for processing grid-like data such as images, using convolutional layers.",
    definitionEs: "Un tipo de red neuronal diseñada para procesar datos en forma de cuadrícula como imágenes, usando capas convolucionales.",
    category: "deep-learning",
    relatedTerms: ["deep-learning", "computer-vision", "image-recognition"],
  },
  {
    id: "rnn",
    term: "Recurrent Neural Network (RNN)",
    definition: "A type of neural network designed for sequential data, where connections form a directed graph along a sequence.",
    definitionEs: "Un tipo de red neuronal diseñada para datos secuenciales, donde las conexiones forman un grafo dirigido a lo largo de una secuencia.",
    category: "deep-learning",
    relatedTerms: ["lstm", "nlp", "sequence-modeling"],
  },
  {
    id: "lstm",
    term: "Long Short-Term Memory (LSTM)",
    definition: "A type of RNN capable of learning long-term dependencies, using gates to control information flow.",
    definitionEs: "Un tipo de RNN capaz de aprender dependencias a largo plazo, usando puertas para controlar el flujo de información.",
    category: "deep-learning",
    relatedTerms: ["rnn", "sequence-modeling", "nlp"],
  },
  {
    id: "transformer",
    term: "Transformer",
    definition: "A neural network architecture that uses self-attention mechanisms, widely used in NLP and foundation models.",
    definitionEs: "Una arquitectura de red neuronal que usa mecanismos de auto-atención, ampliamente usada en NLP y modelos fundacionales.",
    category: "deep-learning",
    relatedTerms: ["attention-mechanism", "gpt", "bert"],
  },
  {
    id: "attention-mechanism",
    term: "Attention Mechanism",
    definition: "A technique that allows models to focus on specific parts of input when producing output, improving performance.",
    definitionEs: "Una técnica que permite a los modelos enfocarse en partes específicas de la entrada al producir salida, mejorando el rendimiento.",
    category: "deep-learning",
    relatedTerms: ["transformer", "self-attention", "sequence-modeling"],
  },
  {
    id: "gan",
    term: "Generative Adversarial Network (GAN)",
    definition: "A framework where two neural networks compete: a generator creates samples and a discriminator evaluates them.",
    definitionEs: "Un marco donde dos redes neuronales compiten: un generador crea muestras y un discriminador las evalúa.",
    category: "deep-learning",
    relatedTerms: ["generative-ai", "image-generation", "adversarial-training"],
  },
  {
    id: "autoencoder",
    term: "Autoencoder",
    definition: "A neural network that learns to compress and reconstruct data, used for dimensionality reduction and feature learning.",
    definitionEs: "Una red neuronal que aprende a comprimir y reconstruir datos, usada para reducción de dimensionalidad y aprendizaje de características.",
    category: "deep-learning",
    relatedTerms: ["dimensionality-reduction", "unsupervised-learning", "representation-learning"],
  },
  {
    id: "activation-function",
    term: "Activation Function",
    definition: "A mathematical function that determines the output of a neural network node given its input.",
    definitionEs: "Una función matemática que determina la salida de un nodo de red neuronal dada su entrada.",
    category: "deep-learning",
    relatedTerms: ["neural-network", "relu", "sigmoid"],
  },
  {
    id: "backpropagation",
    term: "Backpropagation",
    definition: "An algorithm for calculating gradients in neural networks by propagating errors backward through the network.",
    definitionEs: "Un algoritmo para calcular gradientes en redes neuronales propagando errores hacia atrás a través de la red.",
    category: "deep-learning",
    relatedTerms: ["gradient-descent", "neural-network", "optimization"],
  },
  {
    id: "dropout",
    term: "Dropout",
    definition: "A regularization technique that randomly ignores neurons during training to prevent overfitting.",
    definitionEs: "Una técnica de regularización que ignora aleatoriamente neuronas durante el entrenamiento para prevenir el sobreajuste.",
    category: "deep-learning",
    relatedTerms: ["regularization", "overfitting", "neural-network"],
  },
  {
    id: "batch-normalization",
    term: "Batch Normalization",
    definition: "A technique to normalize the inputs of each layer, improving training speed and stability.",
    definitionEs: "Una técnica para normalizar las entradas de cada capa, mejorando la velocidad y estabilidad del entrenamiento.",
    category: "deep-learning",
    relatedTerms: ["normalization", "neural-network", "training"],
  },

  // NLP
  {
    id: "nlp",
    term: "Natural Language Processing (NLP)",
    definition: "A field of AI focused on enabling computers to understand, interpret, and generate human language.",
    definitionEs: "Un campo de IA enfocado en permitir a las computadoras entender, interpretar y generar lenguaje humano.",
    category: "nlp",
    relatedTerms: ["text-analysis", "sentiment-analysis", "language-model"],
  },
  {
    id: "language-model",
    term: "Language Model",
    definition: "A probabilistic model that predicts the probability of a sequence of words, fundamental to modern NLP.",
    definitionEs: "Un modelo probabilístico que predice la probabilidad de una secuencia de palabras, fundamental para el NLP moderno.",
    category: "nlp",
    relatedTerms: ["gpt", "bert", "llm"],
  },
  {
    id: "llm",
    term: "Large Language Model (LLM)",
    definition: "A language model trained on vast amounts of text data, capable of understanding and generating human-like text.",
    definitionEs: "Un modelo de lenguaje entrenado con grandes cantidades de datos de texto, capaz de entender y generar texto similar al humano.",
    category: "nlp",
    relatedTerms: ["gpt", "language-model", "transformer"],
  },
  {
    id: "gpt",
    term: "GPT (Generative Pre-trained Transformer)",
    definition: "A series of large language models by OpenAI that generate human-like text based on prompts.",
    definitionEs: "Una serie de modelos de lenguaje grandes de OpenAI que generan texto similar al humano basándose en prompts.",
    category: "nlp",
    relatedTerms: ["llm", "transformer", "generative-ai"],
  },
  {
    id: "bert",
    term: "BERT (Bidirectional Encoder Representations from Transformers)",
    definition: "A transformer-based model that learns bidirectional representations of text for various NLP tasks.",
    definitionEs: "Un modelo basado en transformer que aprende representaciones bidireccionales de texto para varias tareas de NLP.",
    category: "nlp",
    relatedTerms: ["transformer", "nlp", "language-model"],
  },
  {
    id: "tokenization",
    term: "Tokenization",
    definition: "The process of breaking text into smaller units (tokens) for processing by language models.",
    definitionEs: "El proceso de dividir texto en unidades más pequeñas (tokens) para su procesamiento por modelos de lenguaje.",
    category: "nlp",
    relatedTerms: ["nlp", "preprocessing", "vocabulary"],
  },
  {
    id: "word-embedding",
    term: "Word Embedding",
    definition: "A technique that maps words to dense vector representations capturing semantic relationships.",
    definitionEs: "Una técnica que mapea palabras a representaciones vectoriales densas que capturan relaciones semánticas.",
    category: "nlp",
    relatedTerms: ["vector-representation", "semantic-similarity", "word2vec"],
  },
  {
    id: "sentiment-analysis",
    term: "Sentiment Analysis",
    definition: "The process of determining the emotional tone behind text, classifying it as positive, negative, or neutral.",
    definitionEs: "El proceso de determinar el tono emocional detrás del texto, clasificándolo como positivo, negativo o neutral.",
    category: "nlp",
    relatedTerms: ["nlp", "text-classification", "opinion-mining"],
  },
  {
    id: "named-entity-recognition",
    term: "Named Entity Recognition (NER)",
    definition: "The task of identifying and classifying named entities in text into predefined categories.",
    definitionEs: "La tarea de identificar y clasificar entidades nombradas en texto en categorías predefinidas.",
    category: "nlp",
    relatedTerms: ["nlp", "information-extraction", "entity-extraction"],
  },
  {
    id: "prompt-engineering",
    term: "Prompt Engineering",
    definition: "The practice of designing and optimizing prompts to get desired outputs from AI language models.",
    definitionEs: "La práctica de diseñar y optimizar prompts para obtener salidas deseadas de modelos de lenguaje de IA.",
    category: "nlp",
    relatedTerms: ["llm", "gpt", "prompt-design"],
  },
  {
    id: "fine-tuning",
    term: "Fine-tuning",
    definition: "The process of taking a pre-trained model and further training it on a specific dataset for a particular task.",
    definitionEs: "El proceso de tomar un modelo pre-entrenado y entrenarlo más en un conjunto de datos específico para una tarea particular.",
    category: "nlp",
    relatedTerms: ["transfer-learning", "pre-training", "model-adaptation"],
  },

  // COMPUTER VISION
  {
    id: "computer-vision",
    term: "Computer Vision",
    definition: "A field of AI that enables computers to interpret and understand visual information from the world.",
    definitionEs: "Un campo de IA que permite a las computadoras interpretar y entender información visual del mundo.",
    category: "computer-vision",
    relatedTerms: ["image-recognition", "object-detection", "cnn"],
  },
  {
    id: "image-recognition",
    term: "Image Recognition",
    definition: "The ability of AI systems to identify objects, people, places, and actions in images.",
    definitionEs: "La capacidad de los sistemas de IA para identificar objetos, personas, lugares y acciones en imágenes.",
    category: "computer-vision",
    relatedTerms: ["computer-vision", "object-detection", "classification"],
  },
  {
    id: "object-detection",
    term: "Object Detection",
    definition: "A computer vision task that involves identifying and locating objects in images or videos.",
    definitionEs: "Una tarea de visión por computadora que implica identificar y localizar objetos en imágenes o videos.",
    category: "computer-vision",
    relatedTerms: ["computer-vision", "image-recognition", "bounding-box"],
  },
  {
    id: "image-segmentation",
    term: "Image Segmentation",
    definition: "The process of partitioning an image into multiple segments or regions for easier analysis.",
    definitionEs: "El proceso de dividir una imagen en múltiples segmentos o regiones para un análisis más fácil.",
    category: "computer-vision",
    relatedTerms: ["computer-vision", "object-detection", "semantic-segmentation"],
  },
  {
    id: "facial-recognition",
    term: "Facial Recognition",
    definition: "A technology capable of identifying or verifying a person from a digital image or video frame.",
    definitionEs: "Una tecnología capaz de identificar o verificar a una persona desde una imagen digital o fotograma de video.",
    category: "computer-vision",
    relatedTerms: ["biometrics", "computer-vision", "identity-verification"],
  },
  {
    id: "ocr",
    term: "Optical Character Recognition (OCR)",
    definition: "The electronic conversion of images of typed or printed text into machine-encoded text.",
    definitionEs: "La conversión electrónica de imágenes de texto mecanografiado o impreso en texto codificado por máquina.",
    category: "computer-vision",
    relatedTerms: ["text-extraction", "document-processing", "computer-vision"],
  },

  // GENERATIVE AI
  {
    id: "generative-ai",
    term: "Generative AI",
    definition: "AI systems that can create new content including text, images, audio, and video.",
    definitionEs: "Sistemas de IA que pueden crear nuevo contenido incluyendo texto, imágenes, audio y video.",
    category: "generative-ai",
    relatedTerms: ["gan", "diffusion-model", "llm"],
  },
  {
    id: "diffusion-model",
    term: "Diffusion Model",
    definition: "A type of generative model that learns to generate data by reversing a gradual noising process.",
    definitionEs: "Un tipo de modelo generativo que aprende a generar datos invirtiendo un proceso gradual de ruido.",
    category: "generative-ai",
    relatedTerms: ["stable-diffusion", "image-generation", "generative-ai"],
  },
  {
    id: "stable-diffusion",
    term: "Stable Diffusion",
    definition: "An open-source text-to-image model that generates detailed images from text descriptions.",
    definitionEs: "Un modelo de código abierto de texto a imagen que genera imágenes detalladas desde descripciones de texto.",
    category: "generative-ai",
    relatedTerms: ["diffusion-model", "image-generation", "text-to-image"],
  },
  {
    id: "text-to-image",
    term: "Text-to-Image",
    definition: "AI systems that generate images from textual descriptions using models like DALL-E or Stable Diffusion.",
    definitionEs: "Sistemas de IA que generan imágenes a partir de descripciones textuales usando modelos como DALL-E o Stable Diffusion.",
    category: "generative-ai",
    relatedTerms: ["image-generation", "diffusion-model", "generative-ai"],
  },
  {
    id: "text-to-video",
    term: "Text-to-Video",
    definition: "AI systems that generate video content from textual descriptions.",
    definitionEs: "Sistemas de IA que generan contenido de video a partir de descripciones textuales.",
    category: "generative-ai",
    relatedTerms: ["video-generation", "generative-ai", "text-to-image"],
  },
  {
    id: "voice-synthesis",
    term: "Voice Synthesis",
    definition: "AI technology that generates human-like speech from text input.",
    definitionEs: "Tecnología de IA que genera habla similar a la humana a partir de entrada de texto.",
    category: "generative-ai",
    relatedTerms: ["text-to-speech", "voice-cloning", "generative-ai"],
  },
  {
    id: "image-inpainting",
    term: "Image Inpainting",
    definition: "The process of reconstructing missing or deteriorated parts of an image using AI.",
    definitionEs: "El proceso de reconstruir partes faltantes o deterioradas de una imagen usando IA.",
    category: "generative-ai",
    relatedTerms: ["image-editing", "generative-ai", "computer-vision"],
  },
  {
    id: "style-transfer",
    term: "Style Transfer",
    definition: "The technique of applying the artistic style of one image to the content of another.",
    definitionEs: "La técnica de aplicar el estilo artístico de una imagen al contenido de otra.",
    category: "generative-ai",
    relatedTerms: ["image-generation", "neural-network", "artistic-ai"],
  },

  // DATA SCIENCE
  {
    id: "data-science",
    term: "Data Science",
    definition: "An interdisciplinary field that uses scientific methods to extract knowledge from structured and unstructured data.",
    definitionEs: "Un campo interdisciplinario que usa métodos científicos para extraer conocimiento de datos estructurados y no estructurados.",
    category: "data-science",
    relatedTerms: ["machine-learning", "data-mining", "analytics"],
  },
  {
    id: "big-data",
    term: "Big Data",
    definition: "Extremely large datasets that require specialized tools and techniques to process and analyze.",
    definitionEs: "Conjuntos de datos extremadamente grandes que requieren herramientas y técnicas especializadas para procesar y analizar.",
    category: "data-science",
    relatedTerms: ["data-science", "data-analytics", "distributed-computing"],
  },
  {
    id: "data-mining",
    term: "Data Mining",
    definition: "The process of discovering patterns in large data sets involving methods at the intersection of ML and statistics.",
    definitionEs: "El proceso de descubrir patrones en grandes conjuntos de datos involucrando métodos en la intersección de ML y estadística.",
    category: "data-science",
    relatedTerms: ["data-science", "pattern-recognition", "knowledge-discovery"],
  },
  {
    id: "data-visualization",
    term: "Data Visualization",
    definition: "The graphical representation of data to help users understand patterns, trends, and insights.",
    definitionEs: "La representación gráfica de datos para ayudar a los usuarios a entender patrones, tendencias e insights.",
    category: "data-science",
    relatedTerms: ["data-science", "analytics", "dashboard"],
  },
  {
    id: "bias-variance",
    term: "Bias-Variance Tradeoff",
    definition: "The problem of simultaneously minimizing two sources of error that prevent supervised learning algorithms from generalizing.",
    definitionEs: "El problema de minimizar simultáneamente dos fuentes de error que previenen que los algoritmos de aprendizaje supervisado generalicen.",
    category: "data-science",
    relatedTerms: ["overfitting", "underfitting", "model-complexity"],
  },

  // ETHICS
  {
    id: "ai-ethics",
    term: "AI Ethics",
    definition: "The branch of ethics concerned with the moral implications of artificial intelligence systems.",
    definitionEs: "La rama de la ética preocupada por las implicaciones morales de los sistemas de inteligencia artificial.",
    category: "ethics",
    relatedTerms: ["ai-safety", "bias", "responsible-ai"],
  },
  {
    id: "ai-bias",
    term: "AI Bias",
    definition: "Systematic and repeatable errors in AI systems that create unfair outcomes for certain groups.",
    definitionEs: "Errores sistemáticos y repetibles en sistemas de IA que crean resultados injustos para ciertos grupos.",
    category: "ethics",
    relatedTerms: ["fairness", "ai-ethics", "algorithmic-bias"],
  },
  {
    id: "explainability",
    term: "Explainability (XAI)",
    definition: "The ability to explain how an AI model reaches its decisions in human-understandable terms.",
    definitionEs: "La capacidad de explicar cómo un modelo de IA llega a sus decisiones en términos comprensibles por humanos.",
    category: "ethics",
    relatedTerms: ["interpretability", "black-box", "transparency"],
  },
  {
    id: "ai-safety",
    term: "AI Safety",
    definition: "The field focused on ensuring AI systems operate safely and as intended without causing harm.",
    definitionEs: "El campo enfocado en asegurar que los sistemas de IA operen de manera segura y como se pretende sin causar daño.",
    category: "ethics",
    relatedTerms: ["ai-alignment", "ai-ethics", "responsible-ai"],
  },
  {
    id: "ai-alignment",
    term: "AI Alignment",
    definition: "The challenge of ensuring AI systems act in accordance with human intentions and values.",
    definitionEs: "El desafío de asegurar que los sistemas de IA actúen de acuerdo con las intenciones y valores humanos.",
    category: "ethics",
    relatedTerms: ["ai-safety", "agi", "value-learning"],
  },
  {
    id: "privacy",
    term: "Privacy in AI",
    definition: "The protection of personal data used in AI systems and preventing unauthorized access or misuse.",
    definitionEs: "La protección de datos personales usados en sistemas de IA y prevención del acceso no autorizado o mal uso.",
    category: "ethics",
    relatedTerms: ["data-protection", "gdpr", "differential-privacy"],
  },

  // APPLICATIONS
  {
    id: "chatbot",
    term: "Chatbot",
    definition: "An AI-powered program designed to simulate conversation with human users.",
    definitionEs: "Un programa impulsado por IA diseñado para simular conversación con usuarios humanos.",
    category: "applications",
    relatedTerms: ["nlp", "conversational-ai", "virtual-assistant"],
  },
  {
    id: "virtual-assistant",
    term: "Virtual Assistant",
    definition: "An AI program that can understand natural language and perform tasks for users.",
    definitionEs: "Un programa de IA que puede entender lenguaje natural y realizar tareas para los usuarios.",
    category: "applications",
    relatedTerms: ["chatbot", "voice-assistant", "automation"],
  },
  {
    id: "recommendation-system",
    term: "Recommendation System",
    definition: "AI systems that predict user preferences and suggest relevant items or content.",
    definitionEs: "Sistemas de IA que predicen preferencias de usuarios y sugieren elementos o contenido relevante.",
    category: "applications",
    relatedTerms: ["collaborative-filtering", "content-filtering", "personalization"],
  },
  {
    id: "autonomous-vehicle",
    term: "Autonomous Vehicle",
    definition: "A vehicle capable of sensing its environment and operating without human involvement.",
    definitionEs: "Un vehículo capaz de percibir su entorno y operar sin intervención humana.",
    category: "applications",
    relatedTerms: ["computer-vision", "self-driving", "robotics"],
  },
  {
    id: "predictive-analytics",
    term: "Predictive Analytics",
    definition: "The use of data, statistical algorithms, and ML techniques to predict future outcomes.",
    definitionEs: "El uso de datos, algoritmos estadísticos y técnicas de ML para predecir resultados futuros.",
    category: "applications",
    relatedTerms: ["data-science", "forecasting", "machine-learning"],
  },
  {
    id: "robotics",
    term: "Robotics",
    definition: "The design, construction, and operation of robots, often incorporating AI for intelligence.",
    definitionEs: "El diseño, construcción y operación de robots, a menudo incorporando IA para inteligencia.",
    category: "applications",
    relatedTerms: ["automation", "autonomous-systems", "computer-vision"],
  },
  {
    id: "smart-home",
    term: "Smart Home",
    definition: "A home equipped with IoT devices and AI for automation and improved living experience.",
    definitionEs: "Un hogar equipado con dispositivos IoT e IA para automatización y mejora de la experiencia de vida.",
    category: "applications",
    relatedTerms: ["iot", "automation", "voice-assistant"],
  },
  {
    id: "healthcare-ai",
    term: "Healthcare AI",
    definition: "Application of artificial intelligence in healthcare for diagnosis, treatment, and patient care.",
    definitionEs: "Aplicación de inteligencia artificial en salud para diagnóstico, tratamiento y atención al paciente.",
    category: "applications",
    relatedTerms: ["medical-diagnosis", "drug-discovery", "medical-imaging"],
  },
  {
    id: "fintech-ai",
    term: "FinTech AI",
    definition: "Application of AI in financial services for fraud detection, trading, and customer service.",
    definitionEs: "Aplicación de IA en servicios financieros para detección de fraude, trading y servicio al cliente.",
    category: "applications",
    relatedTerms: ["fraud-detection", "algorithmic-trading", "credit-scoring"],
  },
  {
    id: "edtech-ai",
    term: "EdTech AI",
    definition: "Application of AI in education for personalized learning, assessment, and tutoring.",
    definitionEs: "Aplicación de IA en educación para aprendizaje personalizado, evaluación y tutoría.",
    category: "applications",
    relatedTerms: ["personalized-learning", "adaptive-learning", "tutoring-systems"],
  },
];

// Helper functions
export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.category === category);
}

export function getTermsByLetter(letter: string): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.term.toLowerCase().startsWith(letter.toLowerCase()));
}

export function searchGlossary(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.definitionEs.toLowerCase().includes(lowerQuery)
  );
}

export function getTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find(term => term.id === id);
}

export const totalGlossaryCount = glossaryTerms.length;

// Alphabet for navigation
export const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
