package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.WorkPlanDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.WorkPlan}.
 */
public interface WorkPlanService {
    /**
     * Save a workPlan.
     *
     * @param workPlanDTO the entity to save.
     * @return the persisted entity.
     */
    WorkPlanDTO save(WorkPlanDTO workPlanDTO);

    /**
     * Updates a workPlan.
     *
     * @param workPlanDTO the entity to update.
     * @return the persisted entity.
     */
    WorkPlanDTO update(WorkPlanDTO workPlanDTO);

    /**
     * Partially updates a workPlan.
     *
     * @param workPlanDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WorkPlanDTO> partialUpdate(WorkPlanDTO workPlanDTO);

    /**
     * Get all the workPlans.
     *
     * @return the list of entities.
     */
    List<WorkPlanDTO> findAll();

    /**
     * Get the "id" workPlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WorkPlanDTO> findOne(Long id);

    /**
     * Delete the "id" workPlan.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
