import { motion } from 'framer-motion';

/**
 * Composant WorkflowTimeline
 * Affiche une timeline verticale du workflow AI (Draft -> Critique -> Synthesis)
 * 
 * @param {Object} props
 * @param {Array} props.logs - Tableau d'objets avec { step, agent_id, agent_name, content }
 */
const WorkflowTimeline = ({ logs = [] }) => {
  if (!logs || logs.length === 0) {
    return null;
  }

  // Configuration des styles par étape
  const getStepConfig = (step) => {
    switch (step) {
      case 'DRAFT':
        return {
          alignment: 'left',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/50',
          textColor: 'text-blue-200',
          headerColor: 'text-blue-300',
          icon: '📝',
          maxWidth: 'max-w-2xl',
          gradient: 'from-blue-500/20 to-cyan-500/20',
        };
      case 'CRITIQUE':
        return {
          alignment: 'right',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/50',
          textColor: 'text-amber-200',
          headerColor: 'text-amber-300',
          icon: '⚠️',
          maxWidth: 'max-w-2xl',
          gradient: 'from-amber-500/20 to-orange-500/20',
        };
      case 'SYNTHESIS':
        return {
          alignment: 'center',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/50',
          textColor: 'text-emerald-200',
          headerColor: 'text-emerald-300',
          icon: '✅',
          maxWidth: 'max-w-4xl',
          gradient: 'from-emerald-500/20 to-green-500/20',
          glow: true,
        };
      default:
        return {
          alignment: 'left',
          bgColor: 'bg-slate-500/10',
          borderColor: 'border-slate-500/50',
          textColor: 'text-slate-200',
          headerColor: 'text-slate-300',
          icon: '💬',
          maxWidth: 'max-w-2xl',
          gradient: 'from-slate-500/20 to-slate-600/20',
        };
    }
  };

  // Animation variants pour le stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-6 py-8"
    >
      {/* Timeline Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-slate-100 mb-2">
          Workflow AI - Chain of Thought
        </h3>
        <p className="text-slate-400 text-sm">
          Visualisation du processus de réflexion des agents
        </p>
      </motion.div>

      {/* Timeline Items */}
      <div className="relative px-4 md:px-0">
        {/* Timeline Line (ligne verticale de connexion) - masquée sur mobile */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500/50 via-amber-500/50 to-emerald-500/50" />

        {logs.map((log, index) => {
          const config = getStepConfig(log.step);
          const isLeft = config.alignment === 'left';
          const isCenter = config.alignment === 'center';
          const isRight = config.alignment === 'right';

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative mb-8 ${isCenter ? 'flex justify-center' : ''}`}
            >
              {/* Timeline Dot - masqué sur mobile */}
              <div
                className={`hidden md:block absolute top-6 ${
                  isLeft ? 'right-0' : isRight ? 'left-0' : 'left-1/2 transform -translate-x-1/2'
                } w-4 h-4 rounded-full ${
                  log.step === 'DRAFT'
                    ? 'bg-blue-500 ring-4 ring-blue-500/30'
                    : log.step === 'CRITIQUE'
                    ? 'bg-amber-500 ring-4 ring-amber-500/30'
                    : 'bg-emerald-500 ring-4 ring-emerald-500/30'
                } z-10`}
              />

              {/* Content Bubble */}
              <div
                className={`relative ${
                  isCenter
                    ? 'w-full'
                    : isLeft
                    ? 'md:mr-auto md:ml-0 mx-auto'
                    : 'md:ml-auto md:mr-0 mx-auto'
                } ${config.maxWidth} ${isCenter ? 'mx-auto' : ''}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-2xl border-2 ${config.borderColor} ${config.bgColor} backdrop-blur-sm shadow-xl overflow-hidden ${
                    config.glow && 'ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-slate-950'
                  }`}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50`}
                  />

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{config.icon}</span>
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg ${config.headerColor}`}>
                          {log.agent_name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              log.step === 'DRAFT'
                                ? 'bg-blue-500/20 text-blue-300'
                                : log.step === 'CRITIQUE'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {log.step}
                          </span>
                          <span className="text-xs text-slate-400">
                            {log.agent_id}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Text */}
                    <div
                      className={`${config.textColor} whitespace-pre-wrap leading-relaxed text-sm md:text-base`}
                    >
                      {log.content}
                    </div>
                  </div>

                  {/* Glow effect pour SYNTHESIS */}
                  {config.glow && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WorkflowTimeline;
