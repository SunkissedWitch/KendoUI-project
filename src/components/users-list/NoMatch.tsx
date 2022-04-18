// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button } from '@progress/kendo-react-buttons'

export const NoMatch = () => {
  const navigate = useNavigate();
  return (
    <div className="centered">
      <h2>Oops, something went wrong</h2>
      <Button 
      className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-info" 
      onClick={() => navigate('/')}
      >
        Return home
      </Button>      
    </div>

  )
}