package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.CenterStructureDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.CenterStructure}.
 */
public interface CenterStructureService {
    /**
     * Save a centerStructure.
     *
     * @param centerStructureDTO the entity to save.
     * @return the persisted entity.
     */
    CenterStructureDTO save(CenterStructureDTO centerStructureDTO);

    /**
     * Updates a centerStructure.
     *
     * @param centerStructureDTO the entity to update.
     * @return the persisted entity.
     */
    CenterStructureDTO update(CenterStructureDTO centerStructureDTO);

    /**
     * Partially updates a centerStructure.
     *
     * @param centerStructureDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CenterStructureDTO> partialUpdate(CenterStructureDTO centerStructureDTO);

    /**
     * Get all the centerStructures.
     *
     * @return the list of entities.
     */
    List<CenterStructureDTO> findAll();

    /**
     * Get the "id" centerStructure.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CenterStructureDTO> findOne(Long id);

    /**
     * Delete the "id" centerStructure.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
