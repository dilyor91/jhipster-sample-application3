package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.MaterialTopicLevelDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.MaterialTopicLevel}.
 */
public interface MaterialTopicLevelService {
    /**
     * Save a materialTopicLevel.
     *
     * @param materialTopicLevelDTO the entity to save.
     * @return the persisted entity.
     */
    MaterialTopicLevelDTO save(MaterialTopicLevelDTO materialTopicLevelDTO);

    /**
     * Updates a materialTopicLevel.
     *
     * @param materialTopicLevelDTO the entity to update.
     * @return the persisted entity.
     */
    MaterialTopicLevelDTO update(MaterialTopicLevelDTO materialTopicLevelDTO);

    /**
     * Partially updates a materialTopicLevel.
     *
     * @param materialTopicLevelDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MaterialTopicLevelDTO> partialUpdate(MaterialTopicLevelDTO materialTopicLevelDTO);

    /**
     * Get all the materialTopicLevels.
     *
     * @return the list of entities.
     */
    List<MaterialTopicLevelDTO> findAll();

    /**
     * Get the "id" materialTopicLevel.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MaterialTopicLevelDTO> findOne(Long id);

    /**
     * Delete the "id" materialTopicLevel.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
