package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.WorkPlanRepository;
import uz.tashkec.service.WorkPlanService;
import uz.tashkec.service.dto.WorkPlanDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.WorkPlan}.
 */
@RestController
@RequestMapping("/api")
public class WorkPlanResource {

    private final Logger log = LoggerFactory.getLogger(WorkPlanResource.class);

    private static final String ENTITY_NAME = "workPlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkPlanService workPlanService;

    private final WorkPlanRepository workPlanRepository;

    public WorkPlanResource(WorkPlanService workPlanService, WorkPlanRepository workPlanRepository) {
        this.workPlanService = workPlanService;
        this.workPlanRepository = workPlanRepository;
    }

    /**
     * {@code POST  /work-plans} : Create a new workPlan.
     *
     * @param workPlanDTO the workPlanDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workPlanDTO, or with status {@code 400 (Bad Request)} if the workPlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/work-plans")
    public ResponseEntity<WorkPlanDTO> createWorkPlan(@RequestBody WorkPlanDTO workPlanDTO) throws URISyntaxException {
        log.debug("REST request to save WorkPlan : {}", workPlanDTO);
        if (workPlanDTO.getId() != null) {
            throw new BadRequestAlertException("A new workPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkPlanDTO result = workPlanService.save(workPlanDTO);
        return ResponseEntity
            .created(new URI("/api/work-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /work-plans/:id} : Updates an existing workPlan.
     *
     * @param id the id of the workPlanDTO to save.
     * @param workPlanDTO the workPlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workPlanDTO,
     * or with status {@code 400 (Bad Request)} if the workPlanDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workPlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/work-plans/{id}")
    public ResponseEntity<WorkPlanDTO> updateWorkPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody WorkPlanDTO workPlanDTO
    ) throws URISyntaxException {
        log.debug("REST request to update WorkPlan : {}, {}", id, workPlanDTO);
        if (workPlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, workPlanDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!workPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WorkPlanDTO result = workPlanService.update(workPlanDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workPlanDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /work-plans/:id} : Partial updates given fields of an existing workPlan, field will ignore if it is null
     *
     * @param id the id of the workPlanDTO to save.
     * @param workPlanDTO the workPlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workPlanDTO,
     * or with status {@code 400 (Bad Request)} if the workPlanDTO is not valid,
     * or with status {@code 404 (Not Found)} if the workPlanDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the workPlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/work-plans/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WorkPlanDTO> partialUpdateWorkPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody WorkPlanDTO workPlanDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update WorkPlan partially : {}, {}", id, workPlanDTO);
        if (workPlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, workPlanDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!workPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WorkPlanDTO> result = workPlanService.partialUpdate(workPlanDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workPlanDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /work-plans} : get all the workPlans.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of workPlans in body.
     */
    @GetMapping("/work-plans")
    public List<WorkPlanDTO> getAllWorkPlans() {
        log.debug("REST request to get all WorkPlans");
        return workPlanService.findAll();
    }

    /**
     * {@code GET  /work-plans/:id} : get the "id" workPlan.
     *
     * @param id the id of the workPlanDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workPlanDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/work-plans/{id}")
    public ResponseEntity<WorkPlanDTO> getWorkPlan(@PathVariable Long id) {
        log.debug("REST request to get WorkPlan : {}", id);
        Optional<WorkPlanDTO> workPlanDTO = workPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(workPlanDTO);
    }

    /**
     * {@code DELETE  /work-plans/:id} : delete the "id" workPlan.
     *
     * @param id the id of the workPlanDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/work-plans/{id}")
    public ResponseEntity<Void> deleteWorkPlan(@PathVariable Long id) {
        log.debug("REST request to delete WorkPlan : {}", id);
        workPlanService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
