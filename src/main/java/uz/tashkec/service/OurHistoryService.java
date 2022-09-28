package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.OurHistoryDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.OurHistory}.
 */
public interface OurHistoryService {
    /**
     * Save a ourHistory.
     *
     * @param ourHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    OurHistoryDTO save(OurHistoryDTO ourHistoryDTO);

    /**
     * Updates a ourHistory.
     *
     * @param ourHistoryDTO the entity to update.
     * @return the persisted entity.
     */
    OurHistoryDTO update(OurHistoryDTO ourHistoryDTO);

    /**
     * Partially updates a ourHistory.
     *
     * @param ourHistoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OurHistoryDTO> partialUpdate(OurHistoryDTO ourHistoryDTO);

    /**
     * Get all the ourHistories.
     *
     * @return the list of entities.
     */
    List<OurHistoryDTO> findAll();

    /**
     * Get the "id" ourHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OurHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" ourHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
