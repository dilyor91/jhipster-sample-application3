package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.PopupDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.Popup}.
 */
public interface PopupService {
    /**
     * Save a popup.
     *
     * @param popupDTO the entity to save.
     * @return the persisted entity.
     */
    PopupDTO save(PopupDTO popupDTO);

    /**
     * Updates a popup.
     *
     * @param popupDTO the entity to update.
     * @return the persisted entity.
     */
    PopupDTO update(PopupDTO popupDTO);

    /**
     * Partially updates a popup.
     *
     * @param popupDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PopupDTO> partialUpdate(PopupDTO popupDTO);

    /**
     * Get all the popups.
     *
     * @return the list of entities.
     */
    List<PopupDTO> findAll();

    /**
     * Get the "id" popup.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PopupDTO> findOne(Long id);

    /**
     * Delete the "id" popup.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
