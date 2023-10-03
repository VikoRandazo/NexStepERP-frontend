import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { StoreRootTypes } from '../../../../store/store';
import { ProductType } from '../../../../models/ProductType';
import { useProductFormHook } from './useProductFormHook';
import CreateProductForm from './CreateProductForm/CreateProductForm';
import EditProductForm from './CreateProductForm/EditProductForm/EditProductForm';
import ReadOnlyProductForm from './ReadOnlyProductForm/ReadOnlyProductForm';
import { InteractionsMode, InteractionsModeEnum } from '../../../../models/shared/InteractionsMode';

interface ProductFormProps {
  product?: ProductType;
}

const ProductForm: FC<ProductFormProps> = ({ product }) => {
  
  const modeFromRedux: InteractionsMode = useSelector(
    (state: StoreRootTypes) => state.ui.modal.mode
  );
  
  const { formikBag, formControls } = useProductFormHook(modeFromRedux, product);
  
  const renderContent = () => {
    switch (modeFromRedux) {
      case InteractionsModeEnum.ReadOnly:
        console.log(`readOnly`);

        return <ReadOnlyProductForm product={product!} formControls={formControls} />;
        case InteractionsModeEnum.Create:
          console.log(`create`);

        return <CreateProductForm formikBag={formikBag} formControls={formControls} />;
        case InteractionsModeEnum.Edit:
          console.log(`edit`);
          
        return <EditProductForm product={product!} formikBag={formikBag} formControls={formControls} />;
      default:
        return null;
    }
  };
  
  return <div>{renderContent()}</div>;
};

export default ProductForm;
