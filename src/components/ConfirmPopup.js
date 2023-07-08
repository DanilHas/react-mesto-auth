import PopupWithForm from './PopupWithForm';

function ConfirmPopup({
  isOpen,
  onClose,
  card,
  onCardDelete,
  isLoading,
  isAnyPopupOpened,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    onCardDelete(card);
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      submitButtonTitle="Да"
      submitButtonDescription="подтверждения действия"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={true}
      isAnyPopupOpened={isAnyPopupOpened}
    />
  );
}

export default ConfirmPopup;
