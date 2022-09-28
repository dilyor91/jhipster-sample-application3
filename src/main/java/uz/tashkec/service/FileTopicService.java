package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.FileTopicDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.FileTopic}.
 */
public interface FileTopicService {
    /**
     * Save a fileTopic.
     *
     * @param fileTopicDTO the entity to save.
     * @return the persisted entity.
     */
    FileTopicDTO save(FileTopicDTO fileTopicDTO);

    /**
     * Updates a fileTopic.
     *
     * @param fileTopicDTO the entity to update.
     * @return the persisted entity.
     */
    FileTopicDTO update(FileTopicDTO fileTopicDTO);

    /**
     * Partially updates a fileTopic.
     *
     * @param fileTopicDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FileTopicDTO> partialUpdate(FileTopicDTO fileTopicDTO);

    /**
     * Get all the fileTopics.
     *
     * @return the list of entities.
     */
    List<FileTopicDTO> findAll();

    /**
     * Get the "id" fileTopic.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FileTopicDTO> findOne(Long id);

    /**
     * Delete the "id" fileTopic.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
