export default function RequestAccess() {
  return (
    <form style={{ maxWidth: '360px', overflow:"auto"}}>
      <div className="field">
        <label className="label">Nome</label>
        <div className="control">
          <input className="input" type="text" placeholder="João" />
        </div>
      </div>
      <div className="field">
        <label className="label">Sobrenome</label>
        <div className="control">
          <input className="input" type="text" placeholder="Silva" />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="email" placeholder="joao@email.com" />
        </div>
      </div>
      <div className="field">
        <label className="label">Senha</label>
        <div className="control">
          <input className="input" type="password" placeholder="*****" />
        </div>
      </div>
      <div className="field">
        <label className="label">Repita a senha</label>
        <div className="control">
          <input className="input" type="password" placeholder="*****" />
        </div>
      </div>
      <div className="select is-multiple">
        <label className="label">Instituto</label>
        <select multiple size="3">
          <option value="IO">IO - Instituto de Oceanologia</option>
          <option value="C3">C3 -Centro de Ciências Computacionais</option>
          <option value="ICEAC">ICEAC - Instituto de Ciências Economicas, Administrativas e Sociais </option>
          <option value="ICHI">ICHI - Instituto de Ciências Humans e da Informação</option>
          <option value="EE">Escola de Engenharia</option>
          <option value="IMEF">Instituto de Matemática, Estatistíca e Física</option>
          <option value="ILA">Instituto de Letras e Artes</option>
          <option value="Other">Outro</option>
        </select>
      </div>

      
<div className="control">
  <label className="radio">
    <input type="radio" name="Professor" checked/>
    Professor
  </label>
  <label className="radio">
    <input type="radio" name="Estudante"  />
    Estudante
  </label>
</div>
      <button type="submit" className="button is-primary">
        PEDIR ACESSO
      </button>
    </form>
  );
}
