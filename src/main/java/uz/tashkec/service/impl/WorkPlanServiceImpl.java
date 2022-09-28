package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.WorkPlan;
import uz.tashkec.repository.WorkPlanRepository;
import uz.tashkec.service.WorkPlanService;
import uz.tashkec.service.dto.WorkPlanDTO;
import uz.tashkec.service.mapper.WorkPlanMapper;

/**
 * Service Implementation for managing {@link WorkPlan}.
 */
@Service
@Transactional
public class WorkPlanServiceImpl implements WorkPlanService {

    private final Logger log = LoggerFactory.getLogger(WorkPlanServiceImpl.class);

    private final WorkPlanRepository workPlanRepository;

    private final WorkPlanMapper workPlanMapper;

    public WorkPlanServiceImpl(WorkPlanRepository workPlanRepository, WorkPlanMapper workPlanMapper) {
        this.workPlanRepository = workPlanRepository;
        this.workPlanMapper = workPlanMapper;
    }

    @Override
    public WorkPlanDTO save(WorkPlanDTO workPlanDTO) {
        log.debug("Request to save WorkPlan : {}", workPlanDTO);
        WorkPlan workPlan = workPlanMapper.toEntity(workPlanDTO);
        workPlan = workPlanRepository.save(workPlan);
        return workPlanMapper.toDto(workPlan);
    }

    @Override
    public WorkPlanDTO update(WorkPlanDTO workPlanDTO) {
        log.debug("Request to update WorkPlan : {}", workPlanDTO);
        WorkPlan workPlan = workPlanMapper.toEntity(workPlanDTO);
        workPlan = workPlanRepository.save(workPlan);
        return workPlanMapper.toDto(workPlan);
    }

    @Override
    public Optional<WorkPlanDTO> partialUpdate(WorkPlanDTO workPlanDTO) {
        log.debug("Request to partially update WorkPlan : {}", workPlanDTO);

        return workPlanRepository
            .findById(workPlanDTO.getId())
            .map(existingWorkPlan -> {
                workPlanMapper.partialUpdate(existingWorkPlan, workPlanDTO);

                return existingWorkPlan;
            })
            .map(workPlanRepository::save)
            .map(workPlanMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkPlanDTO> findAll() {
        log.debug("Request to get all WorkPlans");
        return workPlanRepository.findAll().stream().map(workPlanMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WorkPlanDTO> findOne(Long id) {
        log.debug("Request to get WorkPlan : {}", id);
        return workPlanRepository.findById(id).map(workPlanMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete WorkPlan : {}", id);
        workPlanRepository.deleteById(id);
    }
}
