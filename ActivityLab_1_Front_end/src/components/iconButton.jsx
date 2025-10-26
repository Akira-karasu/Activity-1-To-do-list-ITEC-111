export default function IconButton({ icon, alt, onClick, backgroundColor }) {
  return (
    <button 
        className="icon-button" 
        style={{...styles.iconButton, backgroundColor}} 
        onClick={onClick}>
      <img src={icon} alt={alt} width={20} height={20} />
    </button>
  );
}

const styles = {
  iconButton: {
    background: "none",
    border: "none",
    borderRadius: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px",
  },
};

          // <IconButton 
          //   icon={bin}
          //   alt='bin'
          //   onClick={() => console.log('click')}
          //   backgroundColor='#F44A4A'
          // />
        //   <IconButton 
        //     icon={pencil}
        //     alt='pencil'
        //     onClick={() => console.log('click')}
        //     backgroundColor='#46CAFF'
        //   />
          // <IconButton 
          //   icon={plus}
          //   alt='plus'
          //   onClick={() => console.log('click')}
          //   backgroundColor='#56C06D'
          // />