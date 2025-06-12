import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/Cadastro.css';

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


const Cadastro = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    }
    if (value.length > 10) {
      value = value.replace(/(\(\d{2}\) \d{4})(\d{1,4})/, '$1-$2');
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
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Cadastro realizado com sucesso!</h2>
          <p>Seu cartão Votorantim será processado e estará disponível para retirada no local selecionado em até 5 dias úteis.</p>
          <button onClick={() => setSubmitSuccess(false)} className="success-button">
            Fazer novo cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-header">
        <img src="http://votorantim.citymais.com.br/wp-content/uploads/2020/07/logo-city3.png" alt="Logo Votorantim" className="logo" />
        <h1>Cadastro Cartão Votorantim</h1>
        <p>Preencha o formulário abaixo para solicitar seu cartão de transporte</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
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
                <option value="terminal_central">Terminal Central</option>
                <option value="terminal_leste">Terminal Leste</option>
                <option value="terminal_oeste">Terminal Oeste</option>
                <option value="prefeitura">Prefeitura Municipal</option>
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
                <option value="pcd">Pessoa com Deficiência</option>
                <option value="regular">Regular</option>
              </select>
              {errors.tipoCartao && <span className="error-message">{errors.tipoCartao.message}</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => reset()} className="secondary-button">
            Limpar Formulário
          </button>
          <button type="submit" disabled={isSubmitting} className="primary-button">
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              'Enviar Cadastro'
            )}
          </button>
        </div>
      </form>

      <div className="cadastro-footer">
        <p>Dúvidas? Entre em contato pelo telefone (15) 3333-3333</p>
        <p>Horário de atendimento: Segunda a Sexta, das 8h às 17h</p>
      </div>
    </div>
  );
};

export default Cadastro;