export default function RecoveryPassword(){
    return(
       <form action="" style={{ maxWidth: '360px' }}>
        <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="email" placeholder="joao@email.com" />
        </div>
      </div>
      <button className="button is-primary">ENVIAR EMAIL</button>
       </form>
    )

}