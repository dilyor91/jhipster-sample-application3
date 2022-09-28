package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.MaterialTopicDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.MaterialTopic}.
 */
public interface MaterialTopicService {
    /**
     * Save a materialTopic.
     *
     * @param materialTopicDTO the entity to save.
     * @return the persisted entity.
     */
    MaterialTopicDTO save(MaterialTopicDTO materialTopicDTO);

    /**
     * Updates a materialTopic.
     *
     * @param materialTopicDTO the entity to update.
     * @return the persisted entity.
     */
    MaterialTopicDTO update(MaterialTopicDTO materialTopicDTO);

    /**
     * Partially updates a materialTopic.
     *
     * @param materialTopicDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MaterialTopicDTO> partialUpdate(MaterialTopicDTO materialTopicDTO);

    /**
     * Get all the materialTopics.
     *
     * @return the list of entities.
     */
    List<MaterialTopicDTO> findAll();

    /**
     * Get the "id" materialTopic.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MaterialTopicDTO> findOne(Long id);

    /**
     * Delete the "id" materialTopic.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
