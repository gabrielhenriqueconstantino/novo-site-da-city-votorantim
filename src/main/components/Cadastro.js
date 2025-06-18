import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, useAnimation, useInView } from 'framer-motion';
import '../styles/Cadastro.css';
import '../styles/Hero.css';

const schema = yup.object().shape({
  nomeCompleto: yup.string().required('Nome completo é obrigatório'),
  dataNascimento: yup.date()
    .required('Data de nascimento é obrigatória')
    .max(new Date(), 'Data não pode ser no futuro'),
  nomeMae: yup.string().required('Nome da mãe é obrigatório'),
  cpf: yup.string()
    .required('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  telefone: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
  endereco: yup.string().required('Endereço é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  cep: yup.string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
  email: yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  localRetirada: yup.string().required('Local de retirada é obrigatório'),
  tipoCartao: yup.string().required('Tipo de cartão é obrigatório')
});

// Componente de Seção Animada
const AnimatedSection = ({ children, id }) => {

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1, once: true });

  useEffect(() => {
  if (inView) {
    controls.start("visible");
  }
}, [controls, inView]);

  return (
  <motion.div
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      hidden: { opacity: 0, y: 20 }
    }}
    id={id}
  >
    {children}
  </motion.div>
);
};

const Cadastro = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const headerControls = useAnimation();

  useEffect(() => {
    // Animação do cabeçalho quando o componente monta
    headerControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [headerControls]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulação de requisição à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Dados enviados:', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCPF = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
    e.target.value = value;
  };

  const formatTelefone = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      // Se for celular (9 dígitos após o DDD)
      if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      } else {
        // Fixo (8 dígitos após o DDD)
        value = value.replace(/(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      }
    }
    e.target.value = value;
  };

  const formatCEP = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    e.target.value = value;
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
          >✓</motion.div>
          <h2>Cadastro realizado com sucesso!</h2>
          <p>Seu cartão Votorantim será processado e estará disponível para retirada no local selecionado em até 5 dias úteis.</p>
          <motion.button 
            onClick={() => setSubmitSuccess(false)} 
            className="success-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fazer novo cadastro
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="cadastro-container">
      <motion.div 
        className="cadastro-header"
        initial={{ opacity: 0, y: -20 }}
        animate={headerControls}
      >
        <h1>Cadastro Cartão Votorantim</h1>
        <p>Preencha o formulário abaixo para solicitar seu <br />cartão de transporte</p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
        <AnimatedSection id="dados-pessoais">
          <div className="form-section">
            <h2>Dados Pessoais</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nomeCompleto">Nome Completo *</label>
                <input
                  id="nomeCompleto"
                  type="text"
                  {...register('nomeCompleto')}
                  className={errors.nomeCompleto ? 'error' : ''}
                />
                {errors.nomeCompleto && <span className="error-message">{errors.nomeCompleto.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dataNascimento">Data de Nascimento *</label>
                <input
                  id="dataNascimento"
                  type="date"
                  {...register('dataNascimento')}
                  className={errors.dataNascimento ? 'error' : ''}
                />
                {errors.dataNascimento && <span className="error-message">{errors.dataNascimento.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nomeMae">Nome da Mãe *</label>
                <input
                  id="nomeMae"
                  type="text"
                  {...register('nomeMae')}
                  className={errors.nomeMae ? 'error' : ''}
                />
                {errors.nomeMae && <span className="error-message">{errors.nomeMae.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF *</label>
                <input
                  id="cpf"
                  type="text"
                  {...register('cpf')}
                  onChange={formatCPF}
                  maxLength="14"
                  placeholder="000.000.000-00"
                  className={errors.cpf ? 'error' : ''}
                />
                {errors.cpf && <span className="error-message">{errors.cpf.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone *</label>
                <input
                  id="telefone"
                  type="text"
                  {...register('telefone')}
                  onChange={formatTelefone}
                  maxLength="15"
                  placeholder="(00) 00000-0000"
                  className={errors.telefone ? 'error' : ''}
                />
                {errors.telefone && <span className="error-message">{errors.telefone.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'error' : ''}
                  placeholder="seu@email.com"
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="endereco">
          <div className="form-section">
            <h2>Endereço</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="endereco">Endereço *</label>
                <input
                  id="endereco"
                  type="text"
                  {...register('endereco')}
                  className={errors.endereco ? 'error' : ''}
                />
                {errors.endereco && <span className="error-message">{errors.endereco.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="numero">Número *</label>
                <input
                  id="numero"
                  type="text"
                  {...register('numero')}
                  className={errors.numero ? 'error' : ''}
                />
                {errors.numero && <span className="error-message">{errors.numero.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="bairro">Bairro *</label>
                <input
                  id="bairro"
                  type="text"
                  {...register('bairro')}
                  className={errors.bairro ? 'error' : ''}
                />
                {errors.bairro && <span className="error-message">{errors.bairro.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cep">CEP *</label>
                <input
                  id="cep"
                  type="text"
                  {...register('cep')}
                  onChange={formatCEP}
                  maxLength="9"
                  placeholder="00000-000"
                  className={errors.cep ? 'error' : ''}
                />
                {errors.cep && <span className="error-message">{errors.cep.message}</span>}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="dados-cartao">
          <div className="form-section">
            <h2>Dados do Cartão</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="localRetirada">Local de Retirada *</label>
                <select
                  id="localRetirada"
                  {...register('localRetirada')}
                  className={errors.localRetirada ? 'error' : ''}
                >
                  <option value="">Selecione um local</option>
                  <option value="terminal_central">Terminal Urbano João Souto</option>
                  <option value="itinerante">Itinerante</option>
                </select>
                {errors.localRetirada && <span className="error-message">{errors.localRetirada.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tipoCartao">Tipo de Cartão *</label>
                <select
                  id="tipoCartao"
                  {...register('tipoCartao')}
                  className={errors.tipoCartao ? 'error' : ''}
                >
                  <option value="">Selecione um tipo</option>
                  <option value="estudante">Estudante</option>
                  <option value="idoso">Idoso</option>
                  <option value="regular">Comum</option>
                </select>
                {errors.tipoCartao && <span className="error-message">{errors.tipoCartao.message}</span>}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="form-actions">
            <motion.button 
              type="button" 
              onClick={() => reset()} 
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Limpar Formulário
            </motion.button>
            <motion.button 
              type="submit" 
              disabled={isSubmitting} 
              className="primary-button"
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : (
                'Enviar Cadastro'
              )}
            </motion.button>
          </div>
        </AnimatedSection>
      </form>

      <motion.div 
        className="cadastro-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>Dúvidas? Entre em contato pelo telefone (15) 3333-3333</p>
        <p>Horário de atendimento: Segunda a Sexta, das 8h às 17h</p>
      </motion.div>
    </div>
  );
};

export default Cadastro;