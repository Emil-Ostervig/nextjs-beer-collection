import { FormEvent } from "react";
import { BeerFilterFormProps } from "../../types/components/beerFilterForm";

const BeerFilterForm = (props: BeerFilterFormProps) => {
  const layout = props.layout ? props.layout : 'horizontal';
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData((event.target as HTMLFormElement));
    const formProps = Object.fromEntries(formData);
    props.onSubmit && props.onSubmit(formProps as {[id:string]: string});
  }

  return <form className="beer-filter-form" onSubmit={handleSubmit} >
    <div className={`beer-filter-form__fields beer-filter-form__fields--${layout}`}>
      {props.children}
    </div>
    
    <button className="button button--primary" type="submit">
      {props.submitText}
    </button>
  </form>
  

}

export default BeerFilterForm