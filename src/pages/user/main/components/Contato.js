import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/Contato.css';

const Contato = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Dados do formulário:', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div 
        className="success-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="success-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FiSend size={48} />
          </motion.div>
          <h2>Mensagem enviada com sucesso!</h2>
          <p>Obrigado por entrar em contato. Nossa equipe responderá em breve.</p>
          <motion.button 
            onClick={() => setSubmitSuccess(false)} 
            className="success-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enviar nova mensagem
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const contactInfo = [
    {
    title: "Telefones",
    icon: <FiPhone size={20} />,
    content: [
      <span key="tel">
        <a
          href="https://wa.me/5515933001483"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          (15) 93300-1483 <FaWhatsapp size={18} color="#25D366" />
        </a>
      </span>
    ]
  },
    {
    title: "E-mail",
    icon: <FiMail size={20} />,
    content: [
      <a
        key="email"
        href="mailto:comunicacao.votorantim@citytransporte.com.br"
        className="email-link"
      >
        comunicacao.votorantim@citytransporte.com.br
      </a>
    ]
  },
    {
      title: "Endereço",
      icon: <FiMapPin size={20} />,
      content: [
        "Av. Dr. Armando Pannunzio, 2085 - Jardim Vera Cruz, Sorocaba - SP, 18050-000"
      ]
    },
    {
      title: "Horário de Atendimento",
      icon: <FiClock size={20} />,
      content: [
        "De segunda a sexta-feira",
        "08h - 12h | 13h - 17h48"
      ]
    }
  ];

  return (
    <div className="contato-container">
      {/* Hero Section */}
      <motion.div 
        className="contato-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-content">
          <h1>Fale Conosco</h1>
          <p>Estamos aqui para ajudar! <br />Entre em contato através do formulário ou pelos nossos canais de atendimento.</p>
        </div>
      </motion.div>

      {/* Main Content - Reordered for mobile */}
      <div className="contato-content">
        {/* Contact Info - First on mobile */}
        <motion.div 
          className="contato-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Informações de Contato</h2>
          
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className={`info-accordion ${activeAccordion === index ? 'active' : ''}`}
            >
              <div 
                className="info-accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <FiChevronDown className="accordion-arrow" />
              </div>
              <div className="info-accordion-content">
                {info.content.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5173.22877202992!2d-47.49067034256601!3d-23.53159799390192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58baaa7df7fa5%3A0xe219582568857b0b!2sCity%20Transportes%20-%20Garagem%20Sorocaba!5e0!3m2!1spt-BR!2sbr!4v1750097705023!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="300"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Localização"
            ></iframe>
          </div>
        </motion.div>

        {/* Contact Form - Second on mobile */}
        <motion.div 
          className="contato-form-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Envie sua mensagem</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="contato-form">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo *</label>
              <input
                id="nome"
                type="text"
                {...register('nome', { required: 'Nome é obrigatório' })}
                className={errors.nome ? 'error' : ''}
              />
              {errors.nome && <span className="error-message">{errors.nome.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail *</label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'E-mail inválido'
                  }
                })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="tel"
                {...register('telefone')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="assunto">Assunto *</label>
              <div className="select-wrapper">
                <select
                  id="assunto"
                  {...register('assunto', { required: 'Assunto é obrigatório' })}
                  className={errors.assunto ? 'error' : ''}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="elogio">Elogio</option>
                  <option value="outro">Outro</option>
                </select>
                <FiChevronDown className="select-arrow" />
              </div>
              {errors.assunto && <span className="error-message">{errors.assunto.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mensagem">Mensagem *</label>
              <textarea
                id="mensagem"
                rows="5"
                {...register('mensagem', { 
                  required: 'Mensagem é obrigatória',
                  minLength: {
                    value: 10,
                    message: 'Mensagem deve ter pelo menos 10 caracteres'
                  }
                })}
                className={errors.mensagem ? 'error' : ''}
              />
              {errors.mensagem && <span className="error-message">{errors.mensagem.message}</span>}
            </div>

            <motion.button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-button"
              whileTap={{ scale: 0.97 }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <FiSend className="icon" />
                  Enviar Mensagem
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contato;